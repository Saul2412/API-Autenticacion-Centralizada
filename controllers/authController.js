import User from "../models/User.js";
import { generateUserToken } from "../services/jwtService.js";

// LOGIN
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Usuario de prueba quemado (opcional)
        if (username === "test@correo.com" && password === "123456") {
            const mockUser = {
                id: "usuario_prueba_id_123",
                username: "test@correo.com",
                name: "Usuario de Prueba",
                role: "user"
            };

            const token = generateUserToken(mockUser);
            return res.json({
                message: "¡Autenticación exitosa con usuario de prueba!",
                token,
                user: mockUser
            });
        }

        // Buscar usuario real en la base de datos por username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Validación de contraseña usando el método del modelo
        const isMatch = await user.comparePassword(password); 
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = generateUserToken(user);
        res.json({
            message: "Autenticación exitosa",
            token,
            user: { id: user._id, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE (Registro)
const create = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = generateUserToken(user);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET BY ID
const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    login,
    create,
    getAll,
    getById,
    update,
    delete: deleteUser
};