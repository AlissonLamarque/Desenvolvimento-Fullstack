import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const IAChat = () => {
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');

    const enviarPergunta = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/ia', { pergunta });
            setResposta(res.data.resposta);
        } catch (error) {
            console.error("Erro ao enviar pergunta", error);
            setResposta("Não foi possível obter uma resposta. Verifique se o backend está rodando.");
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
            <TextField
                label="Digite sua pergunta"
                fullWidth
                variant="outlined"
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={enviarPergunta}
                style={{ marginTop: 10 }}
            >
                Perguntar à IA
            </Button>
            {resposta && 
                <Typography 
                    variant="body1" 
                    sx={{
                        marginTop: '20px',
                        padding: '16px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        textAlign: 'left',
                        whiteSpace: 'pre-wrap', // Preserva quebras de linha e espaços da resposta da IA
                    }}
                >
                    {resposta}
                </Typography>
            }
        </div>
    );
};

export default IAChat;