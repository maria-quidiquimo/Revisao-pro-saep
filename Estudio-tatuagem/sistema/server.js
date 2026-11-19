require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const projetoRoutes = require('./src/routes/projetoRoutes');
const sessaoRoutes = require('./src/routes/sessaoRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/clientes', authMiddleware, clienteRoutes);
app.use('/api/projetos', authMiddleware, projetoRoutes);
app.use('/api/sessoes', authMiddleware, sessaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});