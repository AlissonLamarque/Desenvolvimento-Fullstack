require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const petsRoutes = require('./routes/pets');
const atendimentosRoutes = require('./routes/atendimentos');
const usuariosRoutes = require('./routes/usuarios');

app.use('/pets', petsRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.post('/register', async (req, res) => {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO USUARIO (nome, email, password) VALUES (?, ?, ?)';
        db.query(query, [nome, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao cadastrar', error: err });
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM USUARIO WHERE email = ?';

    db.query(query, [email], async (err, result) => {
        if (err || result.length === 0) return res.status(400).json({
            message: 'Usuário não encontrado' });
    const user = result[0];
            const match = await bcrypt.compare(password, user.password);

            if(!match) return res.status(401).json({ message: 'Senha incorreta' });
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn:
                    '1h'
            });
            res.json({ token });
        });
    });


    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Definido' : 'Não definido');
    });