const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/cadastro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;

    if (!nome || !email) {
        return res.render('index', { error: 'Por favor, preencha todos os campos.' });
    }

    if (!isValidEmail(email)) {
        return res.render('index', { error: 'Por favor, insira um email válido.' });
    }

    res.render('index', { success: 'Cadastro realizado com sucesso!' });
});

function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
