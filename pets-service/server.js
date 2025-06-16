const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());
app.get('/pets', async (req, res) => {
 const result = await pool.query('SELECT * FROM pets');
 res.json(result.rows);
});
app.post('/pets', async (req, res) => {
 const { name, species, age, owner_id } = req.body;
 await pool.query('INSERT INTO pets (name, species, age, owner_id) VALUES ($1, $2, $3, $4)', 
    [name, species, age, owner_id]);
 res.send('Pet cadastrado!');
});
app.put('/pets/:id', async (req, res) => {
 const { name, species, age, owner_id } = req.body;
 const { id } = req.params;
 await pool.query('UPDATE pets SET name = $1, species = $2, age = $3, owner_id = $4 WHERE id = $5', 
    [name, species, age, owner_id, id]);
 res.send('Pet atualizado!');
});
app.listen(5002, () => console.log("Pets Service rodando na porta 5002"));
