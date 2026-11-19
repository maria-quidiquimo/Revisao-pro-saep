const db = require('../config/db');

class ProjetoRepository {
    async listar() {
        const [rows] = await db.query(`
            SELECT p.*, c.nome AS cliente_nome 
            FROM projetos p 
            INNER JOIN clientes c ON p.cliente_id = c.id
        `);
        return rows;
    }

    async criar({ titulo, descricao, local_corpo, valor_estimado, cliente_id }) {
        const [result] = await db.query(
            'INSERT INTO projetos (titulo, descricao, local_corpo, valor_estimado, cliente_id) VALUES (?, ?, ?, ?, ?)',
            [titulo, descricao, local_corpo, valor_estimado, cliente_id]
        );
        return result.insertId;
    }
}

module.exports = new ProjetoRepository();