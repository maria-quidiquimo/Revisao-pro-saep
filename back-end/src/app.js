require('dotenv').config();

const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');
const clienteController = require('./controllers/clienteController');
const veiculoController = require('./controllers/veiculoController');
const agendamentoController = require('./controllers/agendamentoController');

const app = express();

app.use(express.json());

app.post('/login', authController.login);

app.use(authMiddleware);

app.get('/clientes', clienteController.listar);
app.post('/clientes', clienteController.criar);
app.put('/clientes/:id', clienteController.atualizar);
app.delete('/clientes/:id', clienteController.deletar);

app.get('/veiculos', veiculoController.listar);
app.post('/veiculos', veiculoController.criar);
app.put('/veiculos/:id', veiculoController.atualizar);
app.delete('/veiculos/:id', veiculoController.deletar);

app.get('/agendamentos', agendamentoController.listar);
app.post('/agendamentos', agendamentoController.criar);
app.put('/agendamentos/:id', agendamentoController.atualizarData);
app.delete('/agendamentos/:id', agendamentoController.deletar);

module.exports = app;
