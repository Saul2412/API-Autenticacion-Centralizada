import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import helmet from "helmet"; // Helmet cargado con sintaxis de ES Modules

import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5100;

// ==========================================
// Middlewares de Seguridad y Parseo
// ==========================================
app.disable("x-powered-by"); // Oculta la cabecera Express por seguridad (Hardening)
app.use(helmet());           // Protección y sanitización de cabeceras HTTP activada
app.use(express.json());

// ==========================================
// Rutas
// ==========================================
// Ruta principal de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Autenticacion Centralizada funcionando",
    estado: "OK"
  });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// ==========================================
// Conexión a MongoDB y Arranque del Servidor
// ==========================================
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});