const express = require('express');
require('dotenv').config();

const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();

app.use(express.json());

// Rota pública (Login)
app.use(authRoutes);

// Middleware global de autenticação para as demais rotas
app.use(authMiddleware);

// Rotas protegidas por JWT
app.use(clienteRoutes);
app.use(veiculoRoutes);
app.use(agendamentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});