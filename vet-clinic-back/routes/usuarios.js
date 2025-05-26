const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Cadastro de usuário
router.post('/register', async (req, res) => {
 const { nome, email, password } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
 const query = 'INSERT INTO USUARIOS (NOME, EMAIL, PASSWORD) VALUES (?, ?, ?)';

 db.query(query, [nome, email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao registrar usuário: ' + err);
    } else {
      res.status(201).send('usuário registrado com sucesso!');
    }
  });
});

// Edição de usuário
router.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, password, versao } = req.body;
  const query = `UPDATE USUARIOS SET NOME = ?, EMAIL = ?, PASSWORD = ?, VERSAO=VERSAO+1 WHERE ID = ? AND VERSAO = ?`;

  db.query(query, [nome, email, password, versao], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao editar usuário: ' + err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado.');
    } else {
      res.status(200).send('Usuário atualizado com sucesso!');
    }
  });
});

// Exclusão de usuário
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM USUARIOS WHERE ID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao excluir usuário: ' + err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado.');
    } else {
      res.status(200).send('Usuário excluído com sucesso!');
    }
  });
});
module.exports = router;
