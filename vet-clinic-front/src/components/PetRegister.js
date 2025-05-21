import { useState } from "react";
import axios from "axios";

function PetRegister() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [raca, setRaca] = useState("");
    const [peso, setPeso] = useState("");
    const [dono, setDono] = useState("");

    const handleRegister = async () => {
        const owner_id = localStorage.getItem("user_id");
        await axios.post("http://localhost:3001/pets/petRegister", { nome, idade, raca, peso, dono });
    };

    return (
        <div>
            <h2>Cadastro de Pet</h2>
            <input type="text" placeholder="Nome do Pet" onChange={(e) =>
                setNome(e.target.value)} />
            <input type="text" placeholder="Idade" onChange={(e) =>
                setIdade(e.target.value)} />
            <input type="text" placeholder="Raça" onChange={(e) =>
                setRaca(e.target.value)} />
            <input type="text" placeholder="Peso" onChange={(e) =>
                setPeso(e.target.value)} />
            <input type="text" placeholder="Dono" onChange={(e) =>
                setDono(e.target.value)} />
            <button onClick={handleRegister}>Cadastrar</button>
        </div>
    );
}
export default PetRegister;