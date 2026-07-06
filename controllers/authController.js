const User = require("../models/User");

exports.create = async (req, res) => {
    try {

        const user = new User(req.body);

        await user.save();

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

exports.getAll = async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.getById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.json(user);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.update = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(user);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

exports.delete = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted"
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};