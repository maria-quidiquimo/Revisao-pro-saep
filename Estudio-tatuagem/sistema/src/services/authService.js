const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

async function login(email, senha) {
  const usuario = await usuarioRepository.buscarPorEmail(email);
  if (!usuario || usuario.senha !== senha) {
    const erro = new Error('Credenciais inválidas.');
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  return { token, nome: usuario.nome };
}

module.exports = { login };
