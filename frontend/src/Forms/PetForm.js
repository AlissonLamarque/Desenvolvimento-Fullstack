import React, { useState } from 'react';
import axios from 'axios';
function PetForm() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [age, setAge] = useState('');
    const [owner_id, setOwnerId] = useState('');
    const handleSubmit = () => {
        axios.post('http://localhost:5002/pets', { name, species, age, owner_id })
            .then(() => alert('Pet cadastrado!'))
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h2>Cadastrar Pet</h2>
            <input type="text" placeholder="Nome" onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Espécie" onChange={e => setSpecies(e.target.value)} />
            <input type="number" placeholder="Idade" onChange={e => setAge(e.target.value)} />
            <input type="number" placeholder="ID do Dono" onChange={e =>
                setOwnerId(e.target.value)} />
            <button onClick={handleSubmit}>Salvar</button>
        </div>
    );
}
export default PetForm;
