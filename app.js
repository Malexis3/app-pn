require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const path = require("path");

const app = express();

app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// === server.js (Backend Node.js) ===
// Install: npm init -y && npm install express socket.io
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on('connection', socket => {
  console.log('Client connecté:', socket.id);

  socket.on('joinChannel', channel => {
    socket.join(channel);
    socket.channel = channel;
  });

  socket.on('webrtc-offer', data => {
    socket.to(socket.channel).emit('webrtc-offer', data);
  });

  socket.on('webrtc-answer', data => {
    socket.to(socket.channel).emit('webrtc-answer', data);
  });

  socket.on('webrtc-ice', data => {
    socket.to(socket.channel).emit('webrtc-ice', data);
  });
});


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ["identify", "guilds", "guilds.members.read"]
}, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    return done(null, profile);
}));

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000,() => console.log("Running localhost:3000"));