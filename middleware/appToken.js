import jwt from "jsonwebtoken";

const validateAppToken = (req, res, next) => {
    const appToken = req.headers["app-token"];

    if (!appToken) {
        return res.status(401).json({
            error: true,
            message: "Falta el application token (app-token)"
        });
    }

    try {
        const secret = process.env.APP_TOKEN_SECRET || "mi_app_token_secreto_muy_seguro_2026";
        const decoded = jwt.verify(appToken, secret);
        req.appToken = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Application token inválido o expirado"
        });
    }
};

// ⚠️ Asegúrate de que esta línea esté presente:
export default validateAppToken;