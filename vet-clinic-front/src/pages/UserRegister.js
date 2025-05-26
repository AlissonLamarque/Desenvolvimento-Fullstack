import { useState } from "react";
import '../static/styles.css';

function Register() {
    const [nome, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, password })
            });
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => setMessage(""), 3000);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            setMessage("Erro ao registrar usuário. Verifique os dados.");
            setTimeout(() => setMessage(""), 3000);
        }
    };
    return (
        <div>
            <h2>Cadastro de Usuário</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) =>
                    setName(e.target.value)} required />
                <input type="email" placeholder="E-mail" value={email} onChange={(e) =>
                    setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => 
                    setPassword(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
export default Register;