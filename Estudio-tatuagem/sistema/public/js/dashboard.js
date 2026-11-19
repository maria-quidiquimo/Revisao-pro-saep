const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

if (!token) window.location.href = 'index.html';
document.getElementById('nomeUsuario').innerText = usuario.nome;

const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

function sair() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function mostrarSecao(secao) {
    ['sessoes', 'clientes', 'projetos'].forEach(s => {
        document.getElementById(`sec-${s}`).classList.add('hidden');
    });
    document.getElementById(`sec-${secao}`).classList.remove('hidden');
    if (secao === 'sessoes') carregarSessoes();
    if (secao === 'clientes') carregarClientes();
    if (secao === 'projetos') carregarProjetos();
}

async function verificarAuth(res) {
    if (res.status === 401 || res.status === 403) {
        alert('Sua sessão expirou. Faça login novamente.');
        sair();
    }
}

// --- CLIENTES ---
async function carregarClientes() {
    const busca = document.getElementById('termoBusca').value;
    const res = await fetch(`/api/clientes?busca=${encodeURIComponent(busca)}`, { headers });
    await verificarAuth(res);
    const clientes = await res.json();

    const tbody = document.getElementById('tabelaClientes');
    const select = document.getElementById('projetoCliente');
    tbody.innerHTML = '';
    select.innerHTML = '<option value="">Selecione o Cliente...</option>';

    clientes.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.cpf}</td>
                <td>${c.telefone}</td>
                <td>${c.email || ''}</td>
                <td><button onclick='editarCliente(${JSON.stringify(c)})'>Editar</button></td>
            </tr>`;
        select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });
}

function editarCliente(c) {
    document.getElementById('clienteId').value = c.id;
    document.getElementById('clienteNome').value = c.nome;
    document.getElementById('clienteCpf').value = c.cpf;
    document.getElementById('clienteTelefone').value = c.telefone;
    document.getElementById('clienteEmail').value = c.email;
}

document.getElementById('formCliente').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('clienteId').value;
    const body = {
        nome: document.getElementById('clienteNome').value,
        cpf: document.getElementById('clienteCpf').value,
        telefone: document.getElementById('clienteTelefone').value,
        email: document.getElementById('clienteEmail').value
    };

    const url = id ? `/api/clientes/${id}` : '/api/clientes';
    const method = id ? 'PUT' : 'POST';

    await fetch(url, { method, headers, body: JSON.stringify(body) });
    e.target.reset();
    document.getElementById('clienteId').value = '';
    carregarClientes();
});

// --- PROJETOS ---
async function carregarProjetos() {
    await carregarClientes();
    const res = await fetch('/api/projetos', { headers });
    await verificarAuth(res);
    const projetos = await res.json();

    const tbody = document.getElementById('tabelaProjetos');
    const select = document.getElementById('sessaoProjeto');
    tbody.innerHTML = '';
    select.innerHTML = '<option value="">Selecione o Projeto...</option>';

    projetos.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.titulo}</td>
                <td>${p.cliente_nome}</td>
                <td>${p.local_corpo}</td>
                <td>R$ ${p.valor_estimado}</td>
            </tr>`;
        select.innerHTML += `<option value="${p.id}">${p.titulo} (${p.cliente_nome})</option>`;
    });
}

document.getElementById('formProjeto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        cliente_id: document.getElementById('projetoCliente').value,
        titulo: document.getElementById('projetoTitulo').value,
        local_corpo: document.getElementById('projetoLocal').value,
        valor_estimado: document.getElementById('projetoValor').value,
        descricao: document.getElementById('projetoDescricao').value
    };

    await fetch('/api/projetos', { method: 'POST', headers, body: JSON.stringify(body) });
    e.target.reset();
    carregarProjetos();
});

// --- SESSÕES ---
async function carregarSessoes() {
    await carregarProjetos();
    const res = await fetch('/api/sessoes', { headers });
    await verificarAuth(res);
    const sessoes = await res.json();

    const tbody = document.getElementById('tabelaSessoes');
    tbody.innerHTML = '';

    sessoes.forEach(s => {
        const dataFormatada = new Date(s.data_sessao).toLocaleString('pt-BR');
        tbody.innerHTML += `
            <tr>
                <td>${dataFormatada}</td>
                <td><strong>${s.cliente_nome}</strong><br>${s.cliente_telefone}</td>
                <td><strong>${s.projeto_titulo}</strong><br>${s.local_corpo}</td>
                <td>R$ ${s.valor_estimado}</td>
                <td>
                    <input type="datetime-local" id="novaData-${s.sessao_id}">
                    <button onclick="atualizarDataSessao(${s.sessao_id})">Salvar Data</button>
                </td>
            </tr>`;
    });
}

document.getElementById('formSessao').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        projeto_id: document.getElementById('sessaoProjeto').value,
        data_sessao: document.getElementById('sessaoData').value,
        observacoes: document.getElementById('sessaoObs').value
    };

    await fetch('/api/sessoes', { method: 'POST', headers, body: JSON.stringify(body) });
    e.target.reset();
    carregarSessoes();
});

async function atualizarDataSessao(id) {
    const novaData = document.getElementById(`novaData-${id}`).value;
    if (!novaData) return alert('Selecione a nova data!');
    await fetch(`/api/sessoes/${id}/data`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ data_sessao: novaData })
    });
    carregarSessoes();
}

// Inicialização
carregarSessoes();