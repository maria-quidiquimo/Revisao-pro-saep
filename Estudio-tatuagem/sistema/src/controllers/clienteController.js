const clienteService = require('../services/clienteService');

exports.listar = async (req, res) => {
    try {
        const { busca } = req.query;
        const clientes = await clienteService.listar(busca);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const id = await clienteService.cadastrar(req.body);
        res.status(201).json({ id, mensagem: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        await clienteService.editar(req.params.id, req.body);
        res.json({ mensagem: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};