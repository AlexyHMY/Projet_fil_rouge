import { createContact, getContactsByUserId, updateContact, deleteContact } from "../models/contactModel.js";

// GET /contacts
export const getContacts = async (req, res, next) => {
    try {
        const contacts = await getContactsByUserId(req.user.id);
        res.json(contacts);
    } catch (error) {
        next(error);
    }
};

// POST /contacts
export const addContact = async (req, res, next) => {
    try {
        const contact = await createContact(req.user.id, req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

// PATCH /contacts/:id
export const editContact = async (req, res, next) => {
    try {
        const contact = await updateContact(req.user.id, req.params.id, req.body);
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

//DELETE /contacts/:id
export const removeContact = async (req, res, next) => {
    try {
        const contact = await deleteContact(req.user.id, req.params.id);
        res.json(contact);
    } catch (error) {
        next(error);
    }
};