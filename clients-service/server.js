const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/clients', async (req, res) => {
 const result = await pool.query('SELECT * FROM clients');
 res.json(result.rows);
});
app.post('/clients', async (req, res) => {
 const { name, email } = req.body;
 await pool.query('INSERT INTO clients (name, email) VALUES ($1, $2)', [name, email]);
 res.send('Cliente cadastrado!');
});
app.put('/clients/:id', async (req, res) => {
 const { name, email } = req.body;
 const { id } = req.params;
 await pool.query('UPDATE clients SET name = $1, email = $2 WHERE id = $3', [name,
email, id]);
 res.send('Cliente atualizado!');
});
app.listen(5001, () => console.log("Clients Service rodando na porta 5001"));