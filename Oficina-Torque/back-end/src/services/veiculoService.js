const veiculoRepository = require('../repositories/veiculoRepository');
const clienteRepository = require('../repositories/clienteRepository');

class VeiculoService {
  async listarTodos() {
    return await veiculoRepository.listarTodos();
  }

  async criar(dadosVeiculo) {
    if (!dadosVeiculo.cliente_id) {
      throw { status: 400, mensagem: 'O campo cliente_id é obrigatório.' };
    }

    const clienteExistente = await clienteRepository.buscarPorId(dadosVeiculo.cliente_id);
    if (!clienteExistente) {
      throw { status: 400, mensagem: 'Cliente informado não existe.' };
    }

    const id = await veiculoRepository.criar(dadosVeiculo);
    return { id, ...dadosVeiculo };
  }

  async atualizar(id, dadosVeiculo) {
    if (!dadosVeiculo.cliente_id) {
      throw { status: 400, mensagem: 'O campo cliente_id é obrigatório.' };
    }

    const veiculoExistente = await veiculoRepository.buscarPorId(id);
    if (!veiculoExistente) {
      throw { status: 404, mensagem: 'Veículo não encontrado.' };
    }

    const clienteExistente = await clienteRepository.buscarPorId(dadosVeiculo.cliente_id);
    if (!clienteExistente) {
      throw { status: 400, mensagem: 'Cliente informado não existe.' };
    }

    await veiculoRepository.atualizar(id, dadosVeiculo);
    return { id, ...dadosVeiculo };
  }

  async deletar(id) {
    const veiculoExistente = await veiculoRepository.buscarPorId(id);
    if (!veiculoExistente) {
      throw { status: 404, mensagem: 'Veículo não encontrado.' };
    }
    await veiculoRepository.deletar(id);
  }
}

module.exports = new VeiculoService();