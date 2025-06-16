import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Clients() {
    const [clients, setClients] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clients.map(client => <li key={client.id}>{client.name}</li>)}
            </ul>
        </div>
    );
}
export default Clients;