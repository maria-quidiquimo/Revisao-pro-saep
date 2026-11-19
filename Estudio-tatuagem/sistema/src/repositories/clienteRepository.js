const db = require('../config/db');

class ClienteRepository {
    async listar(termo = '') {
        if (termo) {
            const [rows] = await db.query(
                'SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ? OR telefone LIKE ?',
                [`%${termo}%`, `%${termo}%`, `%${termo}%`]
            );
            return rows;
        }
        const [rows] = await db.query('SELECT * FROM clientes');
        return rows;
    }

    async criar({ nome, cpf, telefone, email }) {
        const [result] = await db.query(
            'INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
            [nome, cpf, telefone, email]
        );
        return result.insertId;
    }

    async atualizar(id, { nome, cpf, telefone, email }) {
        await db.query(
            'UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?',
            [nome, cpf, telefone, email, id]
        );
    }
}

module.exports = new ClienteRepository();