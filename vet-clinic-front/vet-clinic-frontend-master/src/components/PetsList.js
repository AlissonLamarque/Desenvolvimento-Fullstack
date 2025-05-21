import { useState, useEffect } from "react";
import axios from "axios";
function PetsList() {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchPets();
    }, []);
    const fetchPets = async () => {
        const response = await axios.get("http://localhost:3001/pets/pets");
        setPets(response.data);
    };
    const handleSearch = async () => {
        if (search.trim() === "") {
            fetchPets();
        } else {
            const response = await axios.get(`http://localhost:3001/pets/pets/search?ownerName=$
{search}`);
            setPets(response.data);
        }
    };
    const viewRecords = (petId) => {
        window.location.href = `/records/${petId}`;
    };
    return (
        <div>
            <h2>Lista de Pets</h2>
            <input type="text" placeholder="Buscar por nome do dono" onChange={(e) =>
                setSearch(e.target.value)} />
            <button onClick={handleSearch}>Buscar</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome do Pet</th>
                        <th>Espécie</th>
                        <th>Dono</th>
                        <th>Prontuário</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => (
                        <tr key={pet.id}>
                            <td>{pet.pet_name}</td>
                            <td>{pet.species}</td>
                            <td>{pet.owner_name}</td>
                            <td><button onClick={() => viewRecords(pet.id)}>Ver
                                Prontuário</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PetsList;