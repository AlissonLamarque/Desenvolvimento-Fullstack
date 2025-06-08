import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function Records() {
    const { petId } = useParams();
    const [records, setRecords] = useState([]);
    useEffect(() => {
        fetchRecords();
    }, []);
    const fetchRecords = async () => {
        const response = await axios.get(`http://localhost:3001/prontuarios/records/${petId}`);
        setRecords(response.data);
    };
    return (
        <div>
            <h2>Prontuário do Pet</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Diagnóstico</th>
                        <th>Tratamento</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.diagnosis}</td>
                            <td>{record.treatment}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Records;