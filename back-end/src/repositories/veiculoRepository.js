const db = require('../config/database');

class VeiculoRepository {
  async listarTodos() {
    const [rows] = await db.execute('SELECT * FROM veiculos');
    return rows;
  }

  async buscarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM veiculos WHERE id = ?', [id]);
    return rows[0];
  }

  async criar(veiculo) {
    const { placa, modelo, marca, ano, cliente_id } = veiculo;
    const [result] = await db.execute(
      'INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) VALUES (?, ?, ?, ?, ?)',
      [placa, modelo, marca, ano, cliente_id]
    );
    return result.insertId;
  }

  async atualizar(id, veiculo) {
    const { placa, modelo, marca, ano, cliente_id } = veiculo;
    await db.execute(
      'UPDATE veiculos SET placa = ?, modelo = ?, marca = ?, ano = ?, cliente_id = ? WHERE id = ?',
      [placa, modelo, marca, ano, cliente_id, id]
    );
  }

  async deletar(id) {
    await db.execute('DELETE FROM veiculos WHERE id = ?', [id]);
  }
}

module.exports = new VeiculoRepository();