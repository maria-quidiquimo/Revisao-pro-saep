const sessaoRepository = require('../repositories/sessaoRepository');

class SessaoService {
    async listar() {
        return await sessaoRepository.listarOrdenadoPorData();
    }

    async agendar(dados) {
        if (!dados.projeto_id || !dados.data_sessao) {
            throw new Error('Projeto e data da sessão são obrigatórios.');
        }
        return await sessaoRepository.criar(dados);
    }

    async atualizarData(id, data_sessao) {
        if (!data_sessao) {
            throw new Error('A nova data da sessão deve ser informada.');
        }
        await sessaoRepository.atualizarData(id, data_sessao);
    }
}

module.exports = new SessaoService();