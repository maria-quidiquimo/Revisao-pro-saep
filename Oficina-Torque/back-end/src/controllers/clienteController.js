const clienteService = require('../services/clienteService');

class ClienteController {
  async listar(req, res) {
    try {
      const { busca } = req.query;
      const clientes = await clienteService.listarOuBuscar(busca);
      return res.json(clientes);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async criar(req, res) {
    try {
      const clienteCriado = await clienteService.criar(req.body);
      return res.status(201).json(clienteCriado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const clienteAtualizado = await clienteService.atualizar(id, req.body);
      return res.json(clienteAtualizado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await clienteService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }
}

module.exports = new ClienteController();