import express from 'express';
import { getContacts, addContact, editContact, removeContact } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getContacts);
router.post('/', addContact);
router.patch('/:id', editContact);
router.delete('/:id', removeContact);

export default router;