require('dotenv').config();

const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const veiculoService = require('./services/veiculoService');

const app = express();

app.use(express.json());

app.post('/login', authController.login);

app.use(authMiddleware);

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

module.exports = app;
