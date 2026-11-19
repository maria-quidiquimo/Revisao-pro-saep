const veiculoService = require('../services/veiculoService');

class VeiculoController {
  async listar(req, res) {
    try {
      const veiculos = await veiculoService.listarTodos();
      return res.json(veiculos);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async criar(req, res) {
    try {
      const veiculoCriado = await veiculoService.criar(req.body);
      return res.status(201).json(veiculoCriado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const veiculoAtualizado = await veiculoService.atualizar(id, req.body);
      return res.json(veiculoAtualizado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await veiculoService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }
}

module.exports = new VeiculoController();