const jwt = require('jsonwebtoken');

const JWT_USER_SECRET = process.env.JWT_USER_SECRET || 'mi_secreto_usuarios';
const JWT_APP_SECRET = process.env.JWT_APP_SECRET || 'mi_secreto_aplicaciones';

// 1. TOKEN PERSONAL (CON CADUCIDAD - Ej. 8 horas)
const generateUserToken = (user) => {
  return jwt.sign(
    { 
      id: user._id || user.id, 
      email: user.email, 
      role: user.role || 'user' 
    }, 
    JWT_USER_SECRET, 
    { expiresIn: '8h' } // <--- CADUCA EN 8 HORAS
  );
};

// 2. TOKEN DE APP (SIN CADUCIDAD)
const generateAppToken = (appId, appName) => {
  return jwt.sign(
    { 
      appId: appId, 
      appName: appName,
      isApp: true 
    }, 
    JWT_APP_SECRET
    // <--- Omitimos 'expiresIn' por completo para que nunca expire
  );
};

module.exports = {
  generateUserToken,
  generateAppToken
};