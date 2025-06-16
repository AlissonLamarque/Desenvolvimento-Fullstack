import React, { useState, useEffect } from 'react';
import axios from 'axios';
function AppointmentForm({ appointmentId }) {
    const [petId, setPetId] = useState('');
    const [date, setDate] = useState('');
    const [vetName, setVetName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        if (appointmentId) {
            axios.get(`http://localhost:5003/appointments/${appointmentId}`)
                .then(response => {
                    setPetId(response.data.pet_id);
                    setDate(response.data.date);
                    setVetName(response.data.vet_name);
                    setIsEditing(true);
                })
                .catch(error => console.error(error));
        }
    }, [appointmentId]);
    const handleSubmit = () => {
        const appointmentData = { pet_id: petId, date, vet_name: vetName };
        if (isEditing) {
            axios.put(`http://localhost:5003/appointments/${appointmentId}`, appointmentData)
                .then(() => alert('Consulta atualizada!'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:5003/appointments', appointmentData)
                .then(() => alert('Consulta cadastrada!'))
                .catch(error => console.error(error));
        }
    };
    return (
        <div>
            <h2>{isEditing ? 'Editar Consulta' : 'Cadastrar Consulta'}</h2>
            <input type="number" placeholder="ID do Pet" value={petId} onChange={e =>
                setPetId(e.target.value)} />
            <input type="datetime-local" placeholder="Data" value={date} onChange={e =>
                setDate(e.target.value)} />
            <input type="text" placeholder="Nome do Veterinário" value={vetName} onChange={e => 
                setVetName(e.target.value)} />
            <button onClick={handleSubmit}>{isEditing ? 'Atualizar' : 'Salvar'}</button>
        </div>
    );
}
export default AppointmentForm;