import jwt from "jsonwebtoken";

const generateAppToken = () => {
    const payload = {
        app: "autenticacion-centralizada",
        role: "application",
        generatedAt: new Date().toISOString(),
        note: "Token sin expiracion"
    };

    // Toma la clave desencriptada del .env o usa el fallback
    const secret = process.env.APP_TOKEN_SECRET || "mi_app_token_secreto_muy_seguro_2026";

    const token = jwt.sign(payload, secret);

    console.log("\n✅ Application Token SIN EXPIRACIÓN Generado:\n");
    console.log(token);
    console.log("\nEste token NO tiene fecha de caducidad.\n");
};

generateAppToken();