const express = require('express'); // 
const cors = require('cors'); // 
const dotenv = require('dotenv'); // 
const axios = require('axios'); // 

dotenv.config(); // 

const app = express();
app.use(express.json()); // 
app.use(cors()); // 

app.post('/api/ia', async (req, res) => {
    const { pergunta } = req.body;

    try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

        // A API do Gemini espera um objeto `contents` com uma estrutura específica.
        const requestData = {
            contents: [{
                parts: [{
                    text: pergunta
                }]
            }]
        };

        const response = await axios.post(geminiUrl, requestData);

        // O caminho para o texto da resposta no JSON do Gemini é diferente.
        const respostaDaIA = response.data.candidates[0].content.parts[0].text;

        res.json({ resposta: respostaDaIA.trim() });

    } catch (error) {
        console.error("Erro detalhado:", error.response ? error.response.data : error.message);
        res.status(500).send('Erro ao comunicar com a IA');
    }
});

app.listen(5000, () => console.log(' Backend rodando na porta 5000')); //