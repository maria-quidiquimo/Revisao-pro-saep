const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resultado = await authService.autenticar(email, senha);
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ erro: error.message });
    }
};