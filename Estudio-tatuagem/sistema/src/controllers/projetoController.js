const projetoService = require('../services/projetoService');

exports.listar = async (req, res) => {
    try {
        const projetos = await projetoService.listar();
        res.json(projetos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const id = await projetoService.cadastrar(req.body);
        res.status(201).json({ id, mensagem: 'Projeto cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};