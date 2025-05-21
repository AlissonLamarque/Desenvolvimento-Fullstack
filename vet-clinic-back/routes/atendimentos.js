const express = require('express');
const db = require('../db');
const router = express.Router();

// Cadastro de atendimento
router.post('/register', async (req, res) => {
 const { pet_id, descricao, procedimentos, observacoes } = req.body;
 const query = 'INSERT INTO ATENDIMENTO (PET_ID, DESCRICAO, PROCEDIMENTOS, OBSERVACOES) VALUES (?, ?, ?, ?)';

 db.query(query, [pet_id, descricao, procedimentos, observacoes], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao registrar atendimento: ' + err);
    } else {
      res.status(201).send('Atendimento registrado com sucesso!');
    }
  });
});

// Edição de atendimento
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, procedimentos, observacoes, versao } = req.body;
    const query = `UPDATE ATENDIMENTO SET DESCRICAO = ?, PROCEDIMENTOS = ?, OBSERVACOES = ?, VERSAO=VERSAO+1 WHERE ID = ? AND VERSAO = ?`;
  
    db.query(query, [descricao, procedimentos, observacoes, id, versao], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao editar atendimento: ' + err);
      } else if (result.affectedRows === 0) {
        res.status(404).send('Atendimento não encontrado.');
      } else {
        res.status(200).send('Atendimento atualizado com sucesso!');
      }
    });
});

// Exclusão de atendimento
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ATENDIMENTO WHERE ID = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao excluir atendimento: ' + err);
      } else if (result.affectedRows === 0) {
        res.status(404).send('Atendimento não encontrado.');
      } else {
        res.status(200).send('Atendimento excluído com sucesso!');
      }
    });
});
  
module.exports = router;
