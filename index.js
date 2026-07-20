import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import helmet from "helmet"; // 👈 Helmet cargado con sintaxis de ES Modules

import authRoutes from "./routes/authRoutes.js"; // 👈 Nota: Es indispensable incluir la extensión .js

const app = express();
const PORT = process.env.PORT || 5100;

// Middlewares
app.use(helmet()); // 👈 Protección de cabeceras HTTP activada
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Autenticacion Centralizada funcionando",
    estado: "OK"
  });
});

// Rutas
app.use("/api/auth", authRoutes);

// Conexión a MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

connectMongoDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});