const db = require('../config/db');

async function listar() {
  const [rows] = await db.execute('SELECT id, nome, cpf_criptografado, telefone, email FROM clientes');
  return rows;
}

async function criar(cliente) {
  const [result] = await db.execute(
    'INSERT INTO clientes (nome, cpf_criptografado, telefone, email) VALUES (?, ?, ?, ?)',
    [cliente.nome, cliente.cpf_criptografado, cliente.telefone, cliente.email]
  );
  return { id: result.insertId, ...cliente };
}

async function atualizar(id, cliente) {
  await db.execute(
    'UPDATE clientes SET nome = ?, cpf_criptografado = ?, telefone = ?, email = ? WHERE id = ?',
    [cliente.nome, cliente.cpf_criptografado, cliente.telefone, cliente.email, id]
  );
}

async function deletar(id) {
  await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
}

module.exports = { listar, criar, atualizar, deletar };
