module.exports = function checkRoles(allowedRoles) {
    return async (req, res, next) => {

        if (!req.user) return res.redirect("/");

        const axios = require("axios");

        try {

            const guildId = process.env.GUILD_ID;

            const member = await axios.get(
                `https://discord.com/api/v10/guilds/${guildId}/members/${req.user.id}`,
                {
                    headers: {
                        Authorization: `Bot ${process.env.CLIENT_TOKEN}`
                    }
                }
            );

            const roles = member.data.roles;

            const hasRole = allowedRoles.some(role => roles.includes(role));

            if (!hasRole) {
                return res.status(403).send("Accès refusé");
            }

            next();

        } catch (err) {
            console.error(err);
            res.status(500).send("Erreur API Discord");
        }
    };
};