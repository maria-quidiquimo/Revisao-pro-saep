const projetoRepository = require('../repositories/projetoRepository');

class ProjetoService {
    async listar() {
        return await projetoRepository.listar();
    }

    async cadastrar(dados) {
        if (!dados.cliente_id) {
            throw new Error('É obrigatório associar o projeto a um cliente.');
        }
        return await projetoRepository.criar(dados);
    }
}

module.exports = new ProjetoService();