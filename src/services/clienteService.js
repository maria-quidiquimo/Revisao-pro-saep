const clienteRepository = require('../repositories/clienteRepository');
const { encrypt, decrypt } = require('../utils/crypto');

class ClienteService {
  async listarOuBuscar(busca) {
    let clientes;
    if (busca) {
      clientes = await clienteRepository.buscarPorTermo(busca);
    } else {
      clientes = await clienteRepository.listarTodos();
    }

    // Descriptografa o CPF para o Front-end
    return clientes.map(cliente => ({
      ...cliente,
      cpf: decrypt(cliente.cpf)
    }));
  }

  async criar(dadosCliente) {
    const cpfCriptografado = encrypt(dadosCliente.cpf);
    const id = await clienteRepository.criar({
      ...dadosCliente,
      cpf: cpfCriptografado
    });
    return { id, ...dadosCliente };
  }

  async atualizar(id, dadosCliente) {
    const clienteExistente = await clienteRepository.buscarPorId(id);
    if (!clienteExistente) {
      throw { status: 404, mensagem: 'Cliente não encontrado.' };
    }

    const cpfCriptografado = encrypt(dadosCliente.cpf);
    await clienteRepository.atualizar(id, {
      ...dadosCliente,
      cpf: cpfCriptografado
    });

    return { id, ...dadosCliente };
  }

  async deletar(id) {
    const clienteExistente = await clienteRepository.buscarPorId(id);
    if (!clienteExistente) {
      throw { status: 404, mensagem: 'Cliente não encontrado.' };
    }
    await clienteRepository.deletar(id);
  }
}

module.exports = new ClienteService();