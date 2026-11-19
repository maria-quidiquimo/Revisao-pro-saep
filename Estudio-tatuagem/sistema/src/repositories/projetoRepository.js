const db = require('../config/db');

async function listar() {
  const [rows] = await db.execute(
    `SELECT p.*, c.nome AS cliente_nome
     FROM projetos p JOIN clientes c ON c.id = p.cliente_id`
  );
  return rows;
}

async function criar(projeto) {
  const [result] = await db.execute(
    'INSERT INTO projetos (cliente_id, titulo, descricao, local_corpo, valor_estimado) VALUES (?, ?, ?, ?, ?)',
    [projeto.cliente_id, projeto.titulo, projeto.descricao, projeto.local_corpo, projeto.valor_estimado]
  );
  return { id: result.insertId, ...projeto };
}

async function atualizar(id, projeto) {
  await db.execute(
    'UPDATE projetos SET cliente_id = ?, titulo = ?, descricao = ?, local_corpo = ?, valor_estimado = ? WHERE id = ?',
    [projeto.cliente_id, projeto.titulo, projeto.descricao, projeto.local_corpo, projeto.valor_estimado, id]
  );
}

async function deletar(id) {
  await db.execute('DELETE FROM projetos WHERE id = ?', [id]);
}

module.exports = { listar, criar, atualizar, deletar };
