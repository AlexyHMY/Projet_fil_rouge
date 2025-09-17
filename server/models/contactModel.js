import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const CONTACT_COLLECTION = 'contact';

// Validation du numéro de téléphone
const isValidPhoneNumber = (phone) => {
    return typeof phone == "string" && phone.length >= 10 && phone.length <= 20;
};

// Créer un nouveau contact
export const createContact = async (userId, { firstName, lastName, phone }) => {
    if (!firstName || !lastName || !phone) throw new Error("Tous les champs sont obligatoires");
    if (!isValidPhoneNumber(phone)) throw new Error("Numéro de téléphone invalide 10-20 caractères");

    const db = getDB();
    const newContact = {
        userId,
        firstName,
        lastName,
        phone,
        createdAt: new Date()
    };

    const result = await db.collection(CONTACT_COLLECTION).insertOne(newContact);
    return { _id: result.insertedId, ...newContact };
};

// Récupérer les contacts de l'utilisateur
export const getContactsByUserId = async (userId) => {
    const db = getDB();
    return await db.collection(CONTACT_COLLECTION).find({ userId }).toArray();
};

// Mettre à jour un contact (tous les champs)
export const updateContact = async (userId, contactId, { firstName, lastName, phone }) => {
    if (phone && !isValidPhoneNumber(phone)) throw new Error("Numéro de téléphone invalide 10-20 caractères");
    const db = getDB();
    const result = await db.collection(CONTACT_COLLECTION).updateOne(
        { _id: new ObjectId(String(contactId)), userId },
        { $set: { firstName, lastName, phone } }
    );
    if (result.matchedCount === 0) throw new Error("Contact introuvable");

    return result;
};

// Supprimer un contact
export const deleteContact = async (userId, contactId) => {
    const db = getDB();
    const result = await db.collection(CONTACT_COLLECTION).deleteOne({ _id: new ObjectId(String(contactId)), userId });
    if (result.deletedCount === 0) throw new Error("Contact introuvable");

    return result;
};