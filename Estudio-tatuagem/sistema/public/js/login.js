const form = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagemErro');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  mensagem.textContent = '';

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
      })
    });
    const dados = await response.json();
    if (!response.ok) {
      mensagem.textContent = dados.mensagem;
      return;
    }

    localStorage.setItem('token', dados.token);
    localStorage.setItem('nome', dados.nome);
    window.location.href = '/dashboard.html';
  } catch (error) {
    mensagem.textContent = 'Não foi possível conectar ao servidor.';
  }
});
