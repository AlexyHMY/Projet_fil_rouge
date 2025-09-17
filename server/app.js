import express from 'express';
import cors from 'cors';
import authServices from './services/authService.js';
import contactServices from './services/contactService.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authServices);
app.use('/contacts', contactServices);

export default app;