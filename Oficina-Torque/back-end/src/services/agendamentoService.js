const agendamentoRepository = require('../repositories/agendamentoRepository');
const veiculoRepository = require('../repositories/veiculoRepository');
const { decrypt } = require('../utils/crypto');

class AgendamentoService {
  async listarComJoin() {
    const agendamentos = await agendamentoRepository.listarComJoin();
    
    // Descriptografa CPF dos clientes retornados no JOIN
    return agendamentos.map(item => ({
      ...item,
      cliente_cpf: decrypt(item.cliente_cpf)
    }));
  }

  async criar(dadosAgendamento) {
    const { veiculo_id, data_agendamento } = dadosAgendamento;

    if (!veiculo_id || !data_agendamento) {
      throw { status: 400, mensagem: 'veiculo_id e data_agendamento são obrigatórios.' };
    }

    const veiculoExistente = await veiculoRepository.buscarPorId(veiculo_id);
    if (!veiculoExistente) {
      throw { status: 400, mensagem: 'Veículo informado não existe.' };
    }

    const id = await agendamentoRepository.criar(dadosAgendamento);
    return { id, ...dadosAgendamento };
  }

  async atualizarData(id, data_agendamento) {
    if (!data_agendamento) {
      throw { status: 400, mensagem: 'A nova data_agendamento é obrigatória.' };
    }

    const agendamentoExistente = await agendamentoRepository.buscarPorId(id);
    if (!agendamentoExistente) {
      throw { status: 404, mensagem: 'Agendamento não encontrado.' };
    }

    await agendamentoRepository.atualizarData(id, data_agendamento);
    return { id, data_agendamento };
  }

  async deletar(id) {
    const agendamentoExistente = await agendamentoRepository.buscarPorId(id);
    if (!agendamentoExistente) {
      throw { status: 404, mensagem: 'Agendamento não encontrado.' };
    }
    await agendamentoRepository.deletar(id);
  }
}

module.exports = new AgendamentoService();