const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());
app.get('/appointments', async (req, res) => {
 const result = await pool.query('SELECT * FROM appointments');
 res.json(result.rows);
});
app.post('/appointments', async (req, res) => {
 const { pet_id, date, vet_name } = req.body;
 await pool.query('INSERT INTO appointments (pet_id, date, vet_name) VALUES ($1, $2, $3)', 
    [pet_id, date, vet_name]);
 res.send('Consulta agendada!');
});
app.put('/appointments/:id', async (req, res) => {
 const { pet_id, date, vet_name } = req.body;
 const { id } = req.params;
 await pool.query('UPDATE appointments SET pet_id = $1, date = $2, vet_name = $3 WHERE id = $4', 
    [pet_id, date, vet_name, id]);
 res.send('Consulta atualizada!');
});
app.listen(5003, () => console.log("Appointments Service rodando na porta 5003"));
