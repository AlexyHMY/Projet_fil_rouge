import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/register", {
                email,
                password,
            });
            setMessage("Inscription réussie !");
        } catch (error) {
            setMessage("Erreur lors de l'inscription");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(element) => setEmail(element.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(element) => setPassword(element.target.value)}
                    required
                />
                <button type="submit">S'inscrire</button>
                <p>{message}</p>
            </form>
            <button onClick={() => navigate("/login")}>Se connecter</button>
        </div>
    );
}