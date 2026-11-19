const db = require('../config/database');

class AgendamentoRepository {
  async listarComJoin() {
    const query = `
      SELECT 
        a.id,
        a.data_agendamento,
        a.descricao,
        a.status,
        v.id AS veiculo_id,
        v.placa,
        v.modelo,
        v.marca,
        v.ano,
        c.id AS cliente_id,
        c.nome AS cliente_nome,
        c.cpf AS cliente_cpf,
        c.telefone AS cliente_telefone,
        c.email AS cliente_email
      FROM agendamentos a
      INNER JOIN veiculos v ON a.veiculo_id = v.id
      INNER JOIN clientes c ON v.cliente_id = c.id
      ORDER BY a.data_agendamento ASC
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  async buscarPorId(id) {
    const [rows] = await db.execute('SELECT * FROM agendamentos WHERE id = ?', [id]);
    return rows[0];
  }

  async criar(agendamento) {
    const { data_agendamento, descricao, status, veiculo_id } = agendamento;
    const [result] = await db.execute(
      'INSERT INTO agendamentos (data_agendamento, descricao, status, veiculo_id) VALUES (?, ?, ?, ?)',
      [data_agendamento, descricao, status || 'Pendente', veiculo_id]
    );
    return result.insertId;
  }

  async atualizarData(id, data_agendamento) {
    await db.execute(
      'UPDATE agendamentos SET data_agendamento = ? WHERE id = ?',
      [data_agendamento, id]
    );
  }

  async deletar(id) {
    await db.execute('DELETE FROM agendamentos WHERE id = ?', [id]);
  }
}

module.exports = new AgendamentoRepository();