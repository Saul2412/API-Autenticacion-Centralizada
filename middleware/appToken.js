import jwt from "jsonwebtoken";

const validateAppToken = (req, res, next) => {
  try {
    // 1. Obtener el token de los headers de la petición
    const appToken = req.headers["app-token"];

    if (!appToken) {
      return res.status(401).json({
        error: true,
        message: "Se requiere el header 'app-token'"
      });
    }

    // 2. Obtener la firma del archivo .env (o la genérica en fallback)
    const secret = process.env.APP_TOKEN_SECRET || process.env.JWT_SECRET || "secreto_por_defecto";

    // 3. Validar el token de forma síncrona/asíncrona
    jwt.verify(appToken, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Application token inválido o expirado"
        });
      }

      // Si es válido, adjuntamos los datos y llamamos al siguiente middleware/controlador
      req.appTokenData = decoded;
      return next(); // 👈 'next' como 3er parámetro garantizado
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default validateAppToken;