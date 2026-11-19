const repository = require('../repositories/sessaoRepository');

async function listar() { return repository.listar(); }
async function criar(dados) { return repository.criar(dados); }
async function atualizar(id, dados) { await repository.atualizar(id, dados); }
async function deletar(id) { await repository.deletar(id); }

module.exports = { listar, criar, atualizar, deletar };
