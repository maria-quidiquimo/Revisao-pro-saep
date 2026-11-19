const authService = require('../services/authService');

async function login(req, res) {
  try {
    const resultado = await authService.login(req.body.email, req.body.senha);
    return res.json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.mensagem || error.message || 'Erro interno.'
    });
  }
}

module.exports = { login };
