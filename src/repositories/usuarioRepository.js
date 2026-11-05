const db = require('../config/database');

class UsuarioRepository {
  async buscarPorEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  async criar(usuario) {
    const { nome, email, senha } = usuario;
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    return result.insertId;
  }
}

module.exports = new UsuarioRepository();