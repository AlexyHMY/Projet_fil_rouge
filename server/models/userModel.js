import bcrypt from 'bcrypt';
import { getDB } from '../config/db.js';

const USER_COLLECTION = 'user';

// Créer un nouvel utilisateur
export const createUser = async (email, password) => {
    const db = getDB();
    const existingUser = await db.collection(USER_COLLECTION).findOne({ email });
    if (existingUser) throw new error("Email déjà utilisé");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        email, 
        password: hashedPassword,
        createdAt: new Date()
    };

    const result = await db.collection(USER_COLLECTION).insertOne(newUser);
    return { _id: result.insertedId, email: newUser.email, createdAt: newUser.createdAt };
};

// Trouver un utilisateur par email
export const findUserByEmail = async (email) => {
    const db = getDB();
    return await db.collection(USER_COLLECTION).findOne({ email });
};