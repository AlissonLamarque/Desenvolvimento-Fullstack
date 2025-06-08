const express = require('express');
const db = require('../db');
const router = express.Router();

// Cadastro de pet
router.post('/register', async (req, res) => {
 const { nome, idade, raca, peso, dono } = req.body;
 const query = 'INSERT INTO PET (NOME, IDADE, RACA, PESO, DONO) VALUES (?, ?, ?, ?, ?)';

 db.query(query, [nome, idade, raca, peso, dono], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao registrar pet: ' + err);
    } else {
      res.status(201).send('Pet registrado com sucesso!');
    }
  });
});

// Edição de pet
router.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, raca, peso, versao } = req.body;
  const query = `UPDATE PET SET NOME = ?, IDADE = ?, RACA = ?, PESO = ?, DONO = ?, VERSAO=VERSAO+1 WHERE ID = ? AND VERSAO = ?`;

  db.query(query, [nome, idade, raca, peso, versao], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao editar pet: ' + err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Pet não encontrado.');
    } else {
      res.status(200).send('Pet atualizado com sucesso!');
    }
  });
});

// Exclusão de pet
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM PET WHERE ID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao excluir pet: ' + err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Pet não encontrado.');
    } else {
      res.status(200).send('Pet excluído com sucesso!');
    }
  });
});
module.exports = router;
