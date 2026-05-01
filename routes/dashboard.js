const router = require("express").Router();
const path = require("path");
const axios = require("axios");
const checkRole = require("../checkRole");

// ID de rôles
const ROLE_EDITEUR = "1430293616412070038"
const ROLE_ADMIN = "1397137409342312543";
const ROLE_MOD = "1397137411276013619";
const ROLE_PN = "1397137411066302575";
const ROLE_EN_SERVICE = "1397137408813695077";

// AGREDITATION :
const ROLE_OPJ = "1397137400467296268";
const ROLE_APJ = "1397137401121476668";
const ROLE_APJA = "1397137401578520606";
const ROLE_RECTRUTEUR = "1397137397833273355";

// Fonctions : 
    // Police Secours
const DIR_PS = "1396656574814224464"
const DIRA_PS = "1396656575652958358"
const AGENT_PS = "1396656576260997131"
    // Brigade Anti-criminalite
const DIR_BAC = "1396656577548652616"
const DIRA_BAC = "1396656578236649587"
const RES_BAC = "1396656579247341649"
const RESA_BAC = "1396656580145188945"
const A_BAC = "1396656580862410842"
const B_BAC = "1396656602718666752"
const C_BAC = "1396656603498807348"
const R_BAC = "1396656604329410600"
    // Compagnie de Sécurisation et d'Intervention
const DIR_CSI = "1396656607164633178"
const DIRA_CSI = "1396790948754882610"
const RES_CSI = "1396790957462130739"
const RESA_CSI ="1396790957894140014"
const A_CSI = "1396790958858960947"
const B_CSI = "1396790960247013457"
const C_CSI = "1396790960473510009"
const R_CSI = "1396790961513697331"
    // Police Judiciaire
const DIR_PJ = "1396790963069779968"
const DIRA_PJ = "1396790963451723796"
const RES_PJ = "1396790964177342524"
const RESA_PJ ="1396790964726661221"
const CE_PJ = "1396790965414662258"
const E_PJ = "1396790966018641931"
const PE_PJ = "1396790966702182483"
    // Compagnie Republicaine de Securité
const DIR_CRS = "1396790969021763715"
const DIRA_CRS = "1396790970120405002"
const RES_CRS = "1396790970665668618"
const RESA_CRS ="1396790971307524166"
const A_CRS = "1396790972230271016"
const B_CRS = "1396790972729528401"
const C_CRS = "1396790973710864474"
const R_CRS = "1396790974352592946"
    
// Grades
const ROLE_CG    = "1396656548268212305";
const ROLE_CD    = "1396656557948669994";
const ROLE_CRE   = "1396656559378927697";
const ROLE_ECRE  = "1396656560310190080";
const ROLE_CDTD  = "1396656561065164831";
const ROLE_CDT   = "1396656561761292289";
const ROLE_CNE   = "1396656562554015884";
const ROLE_LT    = "1396656563535613952";
const ROLE_CNS   = "1396656564001177610";
const ROLE_ENC   = "1396656564785512530";
const ROLE_RULP  = "1396656565670645860";
const ROLE_MEEX  = "1396656566190473276";
const ROLE_MJR   = "1396656566865756211";
const ROLE_BC    = "1396656567834906747";
const ROLE_BGD   = "1396656568287891496";
const ROLE_SB    = "1396656569202114560";
const ROLE_GPX   = "1396656569801900172";
const ROLE_GPXS  = "1396656570456346744";
const ROLE_EGPX  = "1396656571085230172";
const ROLE_PA    = "1396656571802714252";

const GRADES = [
    { id: ROLE_CG,   label: "Commissaire Général"},
    { id: ROLE_CD,   label: "Commissaire Divisionnaire"},
    { id: ROLE_CRE,  label: "Commissaire de Police"},
    { id: ROLE_ECRE, label: "Elève Commissaire"},
    { id: ROLE_CDTD, label: "Commandant Divisionnaire"},
    { id: ROLE_CDT,  label: "Commandant de Police"},
    { id: ROLE_CNE,  label: "Capitaine de Police"},
    { id: ROLE_LT,   label: "Lieutenant de Police"},
    { id: ROLE_CNS,  label: "Capitaine Stagiaire"},
    { id: ROLE_ENC,  label: "Elève Capitaine"},
    { id: ROLE_RULP, label: "Major Responsable d'Unite Local de Police"},
    { id: ROLE_MEEX, label: "Major Exceptionnel"},
    { id: ROLE_MJR,  label: "Major de Police"},
    { id: ROLE_BC,   label: "Brigadier-Chef de Police"},
    { id: ROLE_BGD,  label: "Brigadier de Police"},
    { id: ROLE_SB,   label: "Sous-Brigadier"},
    { id: ROLE_GPX,  label: "Gardien de la Paix"},
    { id: ROLE_GPXS, label: "Gardien de la Paix Stagiaire"},
    { id: ROLE_EGPX, label: "Elève Gardien de la Paix"},
    { id: ROLE_PA,   label: "Policier Adjoint"},
];

const GROUPES = {
    DEV:[
        ROLE_EDITEUR
    ],
    // Généraux
    POLICE: [
        ROLE_CG, ROLE_CD, ROLE_CRE, ROLE_ECRE, 
        ROLE_CDTD, ROLE_CDT, ROLE_CNE, ROLE_LT, ROLE_CNS, ROLE_ENC, 
        ROLE_RULP, ROLE_MEEX, ROLE_MJR, ROLE_BC, ROLE_BGD, ROLE_SB, ROLE_GPX, ROLE_GPXS, ROLE_EGPX, ROLE_PA
    ],

CC: [
        ROLE_CDTD, ROLE_CDT, ROLE_CNE, ROLE_LT, ROLE_CNS, ROLE_ENC
    ],

    CCD: [
        ROLE_CG, ROLE_CD, ROLE_CRE, ROLE_ECRE
    ],

    COMMANDEMENT: [
        ROLE_CG, ROLE_CD, ROLE_CRE, ROLE_ECRE,
        ROLE_CDTD, ROLE_CDT, ROLE_CNE,
        ROLE_LT, ROLE_CNS, ROLE_ENC
    ],

    HAUT_GRADE: [
        ROLE_CG, ROLE_CD, ROLE_CRE, ROLE_ECRE,
        ROLE_CDTD, ROLE_CDT
    ],

    OPJ: [
        ROLE_OPJ, ROLE_APJ, ROLE_APJA
    ],

    DCRFPN: [
        ROLE_RECTRUTEUR
    ],

    // Spécialisations Police Secours
    DIRS_PS: [DIR_PS, DIRA_PS],
    PS:     [DIR_PS, DIRA_PS, AGENT_PS],

    // BAC
    DIRS_BAC: [DIR_BAC, DIRA_BAC, RES_BAC, RESA_BAC],
    BAC:      [DIR_BAC, DIRA_BAC, RES_BAC, RESA_BAC, A_BAC, B_BAC, C_BAC, R_BAC],

    // CSI
    DIRS_CSI: [DIR_CSI, DIRA_CSI, RES_CSI, RESA_CSI],
    CSI:      [DIR_CSI, DIRA_CSI, RES_CSI, RESA_CSI, A_CSI, B_CSI, C_CSI, R_CSI],
    // Police Judiciaire
    DIRS_PJ: [DIR_PJ, DIRA_PJ, RES_PJ, RESA_PJ],
    PJ:      [DIR_PJ, DIRA_PJ, RES_PJ, RESA_PJ, CE_PJ, E_PJ, PE_PJ],

    // CRS
    DIRS_CRS: [DIR_CRS, DIRA_CRS, RES_CRS, RESA_CRS],
    CRS:      [DIR_CRS, DIRA_CRS, RES_CRS, RESA_CRS, A_CRS, B_CRS, C_CRS, R_CRS]

};

function getUserGrade(userRoles) {
    for (const grade of GRADES) {
        if (userRoles.includes(grade.id)) return grade.label;
    }
    return "Aucun grade";
}

function hasAnyRole(userRoles, roleGroup) {
    return roleGroup.some(role => userRoles.includes(role));
}

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/");

    try {
        const guildId = process.env.GUILD_ID;

        // Récupération membre Discord
        const member = await axios.get(
            `https://discord.com/api/v10/guilds/${guildId}/members/${req.user.id}`,
            { headers: { Authorization: `Bot ${process.env.CLIENT_TOKEN}` } }
        );

        const roles = member.data.roles;

        // Déduction du grade
        const grade = getUserGrade(roles);

        // Avatar Discord
        const avatar = req.user.avatar
            ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`
            : "https://cdn.discordapp.com/embed/avatars/0.png";

        // On stocke les liens dans un tableau, puis on les join()
        let links = [];

        if (hasAnyRole(roles,GROUPES.DEV)) {
            links.push(`<a class="btn" href="/dashboard/Tablette">Tablette</a>`);
        }

        if (hasAnyRole(roles,GROUPES.POLICE)) {
            links.push(`<a class="btn" href="/dashboard/Mdt">MDT</a>`);
            links.push(`<a class="btn" href="/dashboard/Annuaire">Annuaire Police</a>`);
            links.push(`<a class="btn" href="/dashboard/Organigramme">Organigramme</a>`);
            links.push(`<a class="btn" href="/dashboard/Reglement">Règlement de l'institution</a><br>`);
        }

        if (hasAnyRole(roles,GROUPES.OPJ)) {
            links.push(`<a class="btn" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfU-HhcY66y7BuUiaqVS-K8-gXjBpo81VekUaJP2HMXssBjgg/viewform">LRPPN</a>`);
        }
        
        if (hasAnyRole(roles,GROUPES.HAUT_GRADE)) {
            links.push(`<a class="btn" href="/dashboard/Gestion">Gestion</a>`);
        }

        if (hasAnyRole(roles, GROUPES.COMMANDEMENT)) {
            links.push(`<a class="btn" target="_blank" href="https://docs.google.com/document/d/1xjJ52bBq9BTrfO51HIltDSQgi0ZoBlVn1rZuUMSB81Q/edit?usp=sharing">Document Commandement</a>`);
        }

        if (hasAnyRole(roles,GROUPES.COMMANDEMENT)){
            links.push(`<br><a class="btn" target="_blank" href="https://discord.com/channels/1396656073313882203/1397189346959822909">MSG - CMD</a>`)
        }
        
        if (hasAnyRole(roles,GROUPES.CSI)){
            links.push(`<a class="btn" target="_blank" href="https://discord.com/channels/1396656073313882203/1397189970279661661">MSG - CSI</a>`)
        }

        if (hasAnyRole(roles,GROUPES.BAC)){
            links.push(`<a class="btn" target="_blank" href="https://discord.com/channels/1396656073313882203/1397189516808159354">MSG - BAC</a>`)
        }

        if (hasAnyRole(roles, GROUPES.DCRFPN)) {
            links.push(`<br><a class="btn-dcrfpn" href="/dashboard/Academie">Académie de Police</a>`);
        }
        

        // =======================
        // RENDU HTML AVEC AVATAR
        // =======================

        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="/style.css">
            <title>Dashboard</title>
            <link rel="icon" href="../Images/pn2.jpeg">

            <script>
                function toggleProfileMenu() {
                    const menu = document.getElementById("profileMenu");
                    menu.style.display = menu.style.display === "block" ? "none" : "block";
                }
            </script>

        </head>
        <body>

            <div class="profile-container" onclick="toggleProfileMenu()">
                <img class="profile-avatar" src="${avatar}" alt="Avatar Discord">
                <div id="profileMenu" class="profile-menu">
                    <p><strong>Nom :</strong> ${req.user.username}</p>
                    <p><strong>Grade :</strong> ${grade}</p>
                    <hr>
                    <a class="btn-secondary" href="/auth/logout">Déconnexion</a>
                </div>
            </div>

            <section class="container">
            <h1>Vous êtes connecter en tant que ${grade}</h1>
                ${links.join("")}
            </section>
        </body>
        </html>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur API Discord");
    }
});

// Routes protégées
// STAFF / DEV
router.get("/tablette", checkRole(GROUPES.DEV), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "tablette.html"));
});

router.get("/admin", checkRole(ROLE_ADMIN), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin.html"));
});

router.get("/mod", checkRole(ROLE_MOD), (req, res) => {
    res.send("<h1>Espace Modérateur</h1>");
});

// PN
router.get("/Annuaire", checkRole(GROUPES.POLICE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "Annuaire.html"));
});

router.get("/Mdt", checkRole(ROLE_EN_SERVICE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "mdt.html"));
});

router.get("/Tablette", checkRole(GROUPES.POLICE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "dispatch.html"));
});

router.get("/Organigramme", checkRole(GROUPES.POLICE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "hierrarchie.html"));
});

router.get("/Reglement", checkRole(GROUPES.POLICE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "reglement.html"));
});

// CCD
router.get("/Gestion", checkRole(GROUPES.HAUT_GRADE), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "gestion.html"));
});

// Formation
router.get("/Academie", checkRole(GROUPES.DCRFPN), (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "dcrfpn.html"));
});

module.exports = router;