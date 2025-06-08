import { useState } from "react";
import axios from "axios";
function RecordRegister({ petId }) {
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const handleRegister = async () => {
        await axios.post("http://localhost:3001/prontuarios/records", {
            pet_id: petId, diagnosis,
            treatment
        });
    };
    return (
        <div>
            <h2>Registrar Prontuário</h2>
            <textarea placeholder="Diagnóstico" onChange={(e) =>
                setDiagnosis(e.target.value)} />
            <textarea placeholder="Tratamento" onChange={(e) =>
                setTreatment(e.target.value)} />
            <button onClick={handleRegister}>Salvar</button>
        </div>
    );
}
export default RecordRegister;