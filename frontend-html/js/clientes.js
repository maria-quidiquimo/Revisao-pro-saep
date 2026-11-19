// Tela de clientes
if (!localStorage.getItem('token')) {
  window.location.href = 'index.html';
}

const tabelaClientes = document.getElementById('tabelaClientes');
const formCadastrar = document.getElementById('formCadastrar');
const formEditar = document.getElementById('formEditar');
const mensagemErro = document.getElementById('mensagemErro');

// Desenha a tabela com os clientes recebidos
function desenharTabela(clientes, idPrioritario) {
  tabelaClientes.innerHTML = '';
  const clientesOrdenados = idPrioritario
    ? [...clientes].sort(
        (a, b) =>
          Number(String(b.id) === String(idPrioritario)) -
          Number(String(a.id) === String(idPrioritario))
      )
    : clientes;
  const nomesExibidos = new Set();
  const clientesSemDuplicados = clientesOrdenados.filter((cliente) => {
    const nomeNormalizado = cliente.nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLocaleLowerCase('pt-BR');

    if (nomesExibidos.has(nomeNormalizado)) {
      return false;
    }

    nomesExibidos.add(nomeNormalizado);
    return true;
  });

  clientesSemDuplicados.forEach((cliente) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.telefone ?? ''}</td>
      <td>${cliente.email ?? ''}</td>
      <td>
        <button class="botaoEditar" data-id="${cliente.id}">Editar</button>
        <button class="botaoExcluir secundario" data-id="${cliente.id}">Excluir</button>
      </td>
    `;
    tabelaClientes.appendChild(linha);
  });

  document.querySelectorAll('.botaoEditar').forEach((botao) => {
    botao.addEventListener('click', () => preencherFormulario(clientes, botao.dataset.id));
  });

  // Remove o cliente escolhido
  document.querySelectorAll('.botaoExcluir').forEach((botao) => {
    botao.addEventListener('click', async () => {
      await apiFetch(`/clientes/${botao.dataset.id}`, { method: 'DELETE' });
      buscarClientes();
    });
  });
}

// Busca os clientes na API, com ou sem termo de busca [RN05]
async function buscarClientes(termo = '', idPrioritario) {
  const resposta = await apiFetch(`/clientes?busca=${encodeURIComponent(termo)}`);
  if (!resposta) return;

  if (!resposta.ok) {
    const dados = await resposta.json();
    mensagemErro.textContent = dados.mensagem || 'Não foi possível carregar os clientes.';
    return;
  }

  const clientes = await resposta.json();
  desenharTabela(clientes, idPrioritario);
}

// Preenche o formulario de edicao com os dados do cliente escolhido
function preencherFormulario(clientes, id) {
  const cliente = clientes.find((item) => String(item.id) === String(id));
  document.getElementById('editarId').value = cliente.id;
  document.getElementById('editarNome').value = cliente.nome;
  document.getElementById('editarCpf').value = cliente.cpf;
  document.getElementById('editarTelefone').value = cliente.telefone ?? '';
  document.getElementById('editarEmail').value = cliente.email ?? '';
}

document.getElementById('botaoBuscar').addEventListener('click', () => {
  buscarClientes(document.getElementById('termoBusca').value);
});

// Cadastra um novo cliente [RN03]
formCadastrar.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagemErro.textContent = '';

  const corpo = {
    nome: document.getElementById('cadastrarNome').value,
    cpf: document.getElementById('cadastrarCpf').value,
    telefone: document.getElementById('cadastrarTelefone').value,
    email: document.getElementById('cadastrarEmail').value,
  };

  const resposta = await apiFetch('/clientes', { method: 'POST', body: JSON.stringify(corpo) });
  if (!resposta) return;

  const dados = await resposta.json();
  if (!resposta.ok) {
    mensagemErro.textContent = dados.mensagem || 'Não foi possível cadastrar o cliente.';
    return;
  }

  formCadastrar.reset();
  await buscarClientes('', dados.id);
});

// Salva a edicao do cliente [RN06]
formEditar.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagemErro.textContent = '';

  const id = document.getElementById('editarId').value;
  const corpo = {
    nome: document.getElementById('editarNome').value,
    cpf: document.getElementById('editarCpf').value,
    telefone: document.getElementById('editarTelefone').value,
    email: document.getElementById('editarEmail').value,
  };

  const resposta = await apiFetch(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(corpo) });
  if (!resposta) return;

  const dados = await resposta.json();
  if (!resposta.ok) {
    mensagemErro.textContent = dados.mensagem || 'Não foi possível atualizar o cliente.';
    return;
  }

  formEditar.reset();
  await buscarClientes();
});

buscarClientes();
