require('dotenv').config();
const crypto = require('crypto');
const clienteRepository = require('../repositories/clienteRepository');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.CRYPTO_KEY, 'utf8');
const iv = Buffer.from(process.env.CRYPTO_IV, 'utf8');

function criptografarCPF(cpf) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(cpf, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function descriptografarCPF(cpfCriptografado) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(cpfCriptografado, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch {
        return '***.***.***-**'; // Fallback caso seja dado mockado do script SQL
    }
}

class ClienteService {
    async listar(termo) {
        const clientes = await clienteRepository.listar(termo);
        return clientes.map(c => ({
            ...c,
            cpf: descriptografarCPF(c.cpf)
        }));
    }

    async cadastrar(dados) {
        if (!dados.nome || !dados.cpf || !dados.telefone) {
            throw new Error('Nome, CPF e telefone são obrigatórios.');
        }
        const cpfCriptografado = criptografarCPF(dados.cpf);
        return await clienteRepository.criar({ ...dados, cpf: cpfCriptografado });
    }

    async editar(id, dados) {
        const cpfCriptografado = criptografarCPF(dados.cpf);
        await clienteRepository.atualizar(id, { ...dados, cpf: cpfCriptografado });
    }
}

module.exports = new ClienteService();