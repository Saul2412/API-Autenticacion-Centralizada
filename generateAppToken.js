// generateAppToken.js
require("dotenv").config();
const jwt = require('jsonwebtoken');

const generateAppToken = () => {
    const payload = {
        app: "autenticacion-centralizada",
        role: "application",
        generatedAt: new Date().toISOString(),
        note: "Token sin expiración"
    };

    const token = jwt.sign(
        payload,
        process.env.APP_TOKEN_SECRET || 'mi_app_token_secreto_muy_seguro_2026'
        // Sin expiresIn = nunca expira
    );

    console.log("\n✅ Application Token SIN EXPIRACIÓN Generado:\n");
    console.log(token);
    console.log("\nEste token NO tiene fecha de caducidad.");
};

generateAppToken();