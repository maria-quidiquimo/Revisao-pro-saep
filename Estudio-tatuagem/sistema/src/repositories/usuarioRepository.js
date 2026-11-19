const db = require('../config/db');

async function buscarPorEmail(email) {
  const [rows] = await db.execute(
    'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = { buscarPorEmail };
