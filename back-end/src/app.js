require('dotenv').config();

const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const clienteController = require('./controllers/clienteController');
const agendamentoController = require('./controllers/agendamentoController');
const veiculoService = require('./services/veiculoService');

const app = express();

app.use((req, res, next) => {
  const origin = req.get('Origin');
  const isLocalOrigin =
    origin === 'null' || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');

  if (origin && isLocalOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

app.post('/login', authController.login);

app.use(authMiddleware);

app.get('/clientes', clienteController.listar);
app.post('/clientes', clienteController.criar);
app.put('/clientes/:id', clienteController.atualizar);
app.delete('/clientes/:id', clienteController.deletar);

app.get('/veiculos', async (req, res) => {
  try {
    const veiculos = await veiculoService.listarTodos();
    return res.json(veiculos);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.post('/veiculos', async (req, res) => {
  try {
    const veiculoCriado = await veiculoService.criar(req.body);
    return res.status(201).json(veiculoCriado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.put('/veiculos/:id', async (req, res) => {
  try {
    const veiculoAtualizado = await veiculoService.atualizar(req.params.id, req.body);
    return res.json(veiculoAtualizado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.delete('/veiculos/:id', async (req, res) => {
  try {
    await veiculoService.deletar(req.params.id);
    return res.status(204).send();
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.get('/agendamentos', agendamentoController.listar);
app.post('/agendamentos', agendamentoController.criar);
app.put('/agendamentos/:id', agendamentoController.atualizarData);
app.delete('/agendamentos/:id', agendamentoController.deletar);

module.exports = app;
