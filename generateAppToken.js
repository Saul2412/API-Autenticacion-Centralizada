import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Lee el secreto de tu .env (o usa un valor por defecto si no lo encuentra)
const secret = process.env.APP_TOKEN_SECRET || process.env.JWT_SECRET || "secreto_por_defecto";

// Payload del token de aplicación
const payload = {
  appName: "Auth API Local",
  role: "application"
};

// Genera el token con validez de 1 año (para que no te caduque mientras haces pruebas)
const appToken = jwt.sign(payload, secret, { expiresIn: '365d' });

console.log("\n=================== TU APP TOKEN ===================");
console.log(appToken);
console.log("====================================================\n");