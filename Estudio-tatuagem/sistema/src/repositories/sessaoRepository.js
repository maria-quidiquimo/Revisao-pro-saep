const db = require('../config/db');

class SessaoRepository {
    async listarOrdenadoPorData() {
        const [rows] = await db.query(`
            SELECT 
                s.id AS sessao_id,
                s.data_sessao,
                s.status,
                s.observacoes,
                p.id AS projeto_id,
                p.titulo AS projeto_titulo,
                p.descricao AS projeto_descricao,
                p.local_corpo,
                p.valor_estimado,
                c.id AS cliente_id,
                c.nome AS cliente_nome,
                c.cpf AS cliente_cpf,
                c.telefone AS cliente_telefone,
                c.email AS cliente_email
            FROM sessoes s
            INNER JOIN projetos p ON s.projeto_id = p.id
            INNER JOIN clientes c ON p.cliente_id = c.id
            ORDER BY s.data_sessao ASC
        `);
        return rows;
    }

    async criar({ data_sessao, status, observacoes, projeto_id }) {
        const [result] = await db.query(
            'INSERT INTO sessoes (data_sessao, status, observacoes, projeto_id) VALUES (?, ?, ?, ?)',
            [data_sessao, status || 'Agendada', observacoes, projeto_id]
        );
        return result.insertId;
    }

    async atualizarData(id, data_sessao) {
        await db.query('UPDATE sessoes SET data_sessao = ? WHERE id = ?', [data_sessao, id]);
    }
}

module.exports = new SessaoRepository();