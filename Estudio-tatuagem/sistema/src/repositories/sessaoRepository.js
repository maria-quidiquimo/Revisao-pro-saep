const db = require('../config/db');

async function listar() {
  const [rows] = await db.execute(
    `SELECT s.*, p.titulo AS projeto_titulo
     FROM sessoes s JOIN projetos p ON p.id = s.projeto_id`
  );
  return rows;
}

async function criar(sessao) {
  const [result] = await db.execute(
    'INSERT INTO sessoes (projeto_id, data_sessao, horario, status) VALUES (?, ?, ?, ?)',
    [sessao.projeto_id, sessao.data_sessao, sessao.horario, sessao.status || 'Agendada']
  );
  return { id: result.insertId, ...sessao };
}

async function atualizar(id, sessao) {
  await db.execute(
    'UPDATE sessoes SET projeto_id = ?, data_sessao = ?, horario = ?, status = ? WHERE id = ?',
    [sessao.projeto_id, sessao.data_sessao, sessao.horario, sessao.status, id]
  );
}

async function deletar(id) {
  await db.execute('DELETE FROM sessoes WHERE id = ?', [id]);
}

module.exports = { listar, criar, atualizar, deletar };
