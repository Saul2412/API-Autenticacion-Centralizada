// generateAppToken.js
require("dotenv").config();
const jwt = require('jsonwebtoken');

const generateAppToken = () => {
    const payload = {
        app: "autenticacion-centralizada",
        role: "application",
        generatedAt: new Date().toISOString()
    };

    const token = jwt.sign(
        payload,
        process.env.APP_TOKEN_SECRET || 'mi_app_token_secreto_muy_seguro_2026',
        { expiresIn: '30d' }
    );

    console.log("\n✅ Application Token Generado:\n");
    console.log(token);
    console.log("\nGuarda este token. Lo necesitarás para hacer peticiones.");
};

generateAppToken();