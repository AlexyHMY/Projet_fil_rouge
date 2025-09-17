import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import testRoutes from './services/testRoutes.js';
import authService from './services/authService.js';
import swaggerUi from 'swagger-ui-express';
import contactService from './services/contactService.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';
import YAML from 'yamljs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/test', testRoutes);
app.use('/auth', authService);
app.use('/contacts', requireAuth, contactService);

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