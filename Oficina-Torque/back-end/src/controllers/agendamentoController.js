const agendamentoService = require('../services/agendamentoService');

class AgendamentoController {
  async listar(req, res) {
    try {
      const agendamentos = await agendamentoService.listarComJoin();
      return res.json(agendamentos);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async criar(req, res) {
    try {
      const agendamentoCriado = await agendamentoService.criar(req.body);
      return res.status(201).json(agendamentoCriado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async atualizarData(req, res) {
    try {
      const { id } = req.params;
      const { data_agendamento } = req.body;
      const agendamentoAtualizado = await agendamentoService.atualizarData(id, data_agendamento);
      return res.json(agendamentoAtualizado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await agendamentoService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno.' });
    }
  }
}

module.exports = new AgendamentoController();