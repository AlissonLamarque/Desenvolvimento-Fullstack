import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Appointments() {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5003/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div>
            <h2>Lista de Consultas</h2>
            <ul>
                {appointments.map(app => <li key={app.id}>{app.date} - {app.vet_name}</li>)}
            </ul>
        </div>
    );
}
export default Appointments;