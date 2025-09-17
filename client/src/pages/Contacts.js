import { useState, useEffect } from "react";
import axios from "axios";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setContacts(response.data);
            } catch (error) {
                setMessage("Erreur lors du chargement des contacts");
            }
        };
        fetchContacts();
    }, [token]);

    // Ajout d'un nouveau contact
    const addContact = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contacts`, {
                firstName,
                lastName,
                phone,
            }, { headers: { Authorization: `Bearer ${token}` } });
            setContacts([...contacts, response.data]);
            setFirstName("");
            setLastName("");
            setPhone("");
            setMessage("Contact ajouté avec succès !");
        } catch (error) {
            setMessage("Erreur lors de l'ajout du contact");
        }
    }

    // Suppression d'un contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/contacts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setContacts(contacts.filter(contact => contact._id !== id));
            setMessage("Contact supprimé avec succès !");
        } catch (error) {
            setMessage("Erreur lors de la suppression du contact");
        }
    }

    // Modification d'un contact
    // const updateContact = async (id) => { }

    return (
        <div>
            <h2>Contacts</h2>
            <form onSubmit={addContact}>
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(elemnt) => setFirstName(elemnt.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(elemnt) => setLastName(elemnt.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(elemnt) => setPhone(elemnt.target.value)}
                    required
                />
                <button type="submit">Ajouter Contact</button>
                <p>{message}</p>
            </form>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>{contact.firstName} {contact.lastName} - {contact.phone}
                        <button>Modifier Contact</button>
                        <button onClick={() => deleteContact(contact._id)}>Supprimer Contact</button></li>
                ))}
            </ul>
        </div>
    )
}