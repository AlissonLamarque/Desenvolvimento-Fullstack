import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Pets() {
    const [pets, setPets] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5002/pets')
            .then(response => setPets(response.data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div>
            <h2>Lista de Pets</h2>
            <ul>
                {pets.map(pet => <li key={pet.id}>{pet.name} - {pet.species}</li>)}
            </ul>
        </div>
    );
}
export default Pets;