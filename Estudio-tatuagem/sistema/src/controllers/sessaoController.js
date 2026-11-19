const sessaoService = require('../services/sessaoService');

exports.listar = async (req, res) => {
    try {
        const sessoes = await sessaoService.listar();
        res.json(sessoes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const id = await sessaoService.agendar(req.body);
        res.status(201).json({ id, mensagem: 'Sessão agendada com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizarData = async (req, res) => {
    try {
        await sessaoService.atualizarData(req.params.id, req.body.data_sessao);
        res.json({ mensagem: 'Data da sessão atualizada com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};