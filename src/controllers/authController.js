const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.login(email, senha);
      return res.json(resultado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno no servidor.' });
    }
  }
}

module.exports = new AuthController();