const mysql = require('mysql2');
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'laboratorio',
 database: 'vet_clinic'
});
db.connect((err) => {
 if (err) {
 console.error('Erro ao conectar ao banco de dados:', err);
 return;
 }
 console.log('Conectado ao banco de dados!');
});
module.exports = db;