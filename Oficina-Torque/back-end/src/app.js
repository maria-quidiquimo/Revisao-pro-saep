require('dotenv').config();

const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const clienteService = require('./services/clienteService');
const veiculoService = require('./services/veiculoService');
const agendamentoService = require('./services/agendamentoService');

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

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await clienteService.listarOuBuscar(req.query.busca);
    return res.json(clientes);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const clienteCriado = await clienteService.criar(req.body);
    return res.status(201).json(clienteCriado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  try {
    const clienteAtualizado = await clienteService.atualizar(req.params.id, req.body);
    return res.json(clienteAtualizado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    await clienteService.deletar(req.params.id);
    return res.status(204).send();
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

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

app.get('/agendamentos', async (req, res) => {
  try {
    const agendamentos = await agendamentoService.listarComJoin();
    return res.json(agendamentos);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.post('/agendamentos', async (req, res) => {
  try {
    const agendamentoCriado = await agendamentoService.criar(req.body);
    return res.status(201).json(agendamentoCriado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.put('/agendamentos/:id', async (req, res) => {
  try {
    const agendamentoAtualizado = await agendamentoService.atualizarData(
      req.params.id,
      req.body.data_agendamento
    );
    return res.json(agendamentoAtualizado);
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

app.delete('/agendamentos/:id', async (req, res) => {
  try {
    await agendamentoService.deletar(req.params.id);
    return res.status(204).send();
  } catch (erro) {
    return res
      .status(erro.status || 500)
      .json({ mensagem: erro.mensagem || 'Erro interno.' });
  }
});

module.exports = app;
