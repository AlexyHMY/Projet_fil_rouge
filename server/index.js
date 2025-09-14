import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import des routes
app.use('/api/test', testRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connexion MongoDB et démarrage du serveur
const startServer = async () => {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();