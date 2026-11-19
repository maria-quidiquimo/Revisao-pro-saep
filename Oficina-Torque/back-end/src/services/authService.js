const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');

class AuthService {
  async login(email, senha) {
    const usuario = await usuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw { status: 401, mensagem: 'Credenciais inválidas.' };
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw { status: 401, mensagem: 'Credenciais inválidas.' };
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, nome: usuario.nome };
  }
}

module.exports = new AuthService();