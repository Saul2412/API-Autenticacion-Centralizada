const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateAppToken = require("../middleware/appToken");

// 1. Aplicar el middleware de Application Token a TODAS las rutas de abajo
router.use(validateAppToken);

// 2. Ruta para iniciar sesión y obtener el "User Token" (Token Personal)
// URL: POST http://localhost:3000/api/auth/login  (o como tengas tu prefijo en index.js)
router.post("/login", authController.login); 

// 3. Rutas de usuario (CRUD)
router.post("/", authController.create);     // Registro/Crear
router.get("/", authController.getAll);       // Obtener todos
router.get("/:id", authController.getById);   // Obtener por ID
router.put("/:id", authController.update);    // Actualizar
router.delete("/:id", authController.delete); // Eliminar

module.exports = router;