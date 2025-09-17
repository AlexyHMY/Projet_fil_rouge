import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// POST /auth/register
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) return res.status(400).json({ message: "Tous les champs sont requis" });
        const user = await createUser(email, password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// POST /auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if ( !user ) return res.status(400).json({ message: "Utilisateur introuvable" });
        const estTrouve = await bcrypt.compare(password, user.password);
        if ( !estTrouve ) return res.status(400).json({ message: "Mot de passe incorrect" });
        const token = generateToken(user._id);
        res.json({ token, user: { email: user.email, createdAt: user.createdAt} });
    } catch (error) {
        next(error);
    }
};