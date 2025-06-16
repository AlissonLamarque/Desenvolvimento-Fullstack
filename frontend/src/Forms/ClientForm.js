import React, { useState } from 'react';
import axios from 'axios';
function ClientForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = () => {
        axios.post('http://localhost:5001/clients', { name, email })
            .then(() => alert('Cliente cadastrado!'))
            .catch(error => console.error(error));
    };
    return (
        <div>
            <h2>Cadastrar Cliente</h2>
            <input type="text" placeholder="Nome" onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>Salvar</button>
        </div>
    );
}
export default ClientForm;
