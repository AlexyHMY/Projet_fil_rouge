import express from 'express';
import { getDB } from '../config/db.js';

const router = express.Router();

// Test : récupérer tous les utilisateurs
router.get('/user', async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('user').find().toArray();
    res.json(users);
  }catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

export default router;