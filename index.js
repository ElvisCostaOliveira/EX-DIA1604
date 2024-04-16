const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Módulo para manipular caminhos de arquivos
const app = express();
const PORT = 3000;

// Middleware para permitir o uso de JSON nas requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos na pasta 'public'

const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'teste@teste.com', senha: '123' }
];

// Rota GET para exibir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota POST para processar o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || usuario.senha !== senha) {
        return res.status(401).send('Credenciais inválidas');
    }

    // Se as credenciais estiverem corretas, redirecionar para página de sucesso
    res.redirect('/sucesso.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

