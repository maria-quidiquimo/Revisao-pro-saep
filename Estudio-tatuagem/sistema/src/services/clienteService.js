const repository = require('../repositories/clienteRepository');
const crypto = require('crypto');

function criptografarCpf(cpf) {
  if (!cpf) return cpf;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.CRYPTO_SECRET_KEY),
    iv
  );
  let criptografado = cipher.update(cpf, 'utf8', 'hex');
  criptografado += cipher.final('hex');
  return `${iv.toString('hex')}:${criptografado}`;
}

async function listar() { return repository.listar(); }
async function criar(dados) {
  return repository.criar({ ...dados, cpf_criptografado: criptografarCpf(dados.cpf) });
}
async function atualizar(id, dados) {
  await repository.atualizar(id, { ...dados, cpf_criptografado: criptografarCpf(dados.cpf) });
}
async function deletar(id) { await repository.deletar(id); }

module.exports = { listar, criar, atualizar, deletar };
