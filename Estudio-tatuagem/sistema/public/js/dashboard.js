const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/index.html';
} else {
  document.getElementById('saudacao').textContent =
    `Olá, ${localStorage.getItem('nome') || 'usuário'}`;

  async function carregar(endpoint, elementoId) {
    const response = await fetch(`/api/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const dados = await response.json();
      document.getElementById(elementoId).textContent = dados.length;
    }
  }

  carregar('clientes', 'totalClientes');
  carregar('projetos', 'totalProjetos');
  carregar('sessoes', 'totalSessoes');
}

document.getElementById('botaoSair').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/index.html';
});
