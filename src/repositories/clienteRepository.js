const db = require('../config/database');

class ClienteRepository {
  async listarTodos() {
    const [rows] = await db.execute('SELECT * FROM clientes');
    return rows;
  }

  async buscarPorTermo(termo) {
    const queryTermo = `%${termo}%`;
    const [rows] = await db.execute(
      'SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ?',
      [queryTermo, queryTermo]
    );
    return rows;
  }

  async buscarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
  }

  async criar(cliente) {
    const { nome, cpf, telefone, email } = cliente;
    const [result] = await db.execute(
      'INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
      [nome, cpf, telefone, email]
    );
    return result.insertId;
  }

  async atualizar(id, cliente) {
    const { nome, cpf, telefone, email } = cliente;
    await db.execute(
      'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?',
      [nome, cpf, telefone, email, id]
    );
  }

  async deletar(id) {
    await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
  }
}

module.exports = new ClienteRepository();