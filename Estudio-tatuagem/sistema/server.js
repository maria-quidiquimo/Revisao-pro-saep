const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/clientes', require('./src/routes/clienteRoutes'));
app.use('/api/projetos', require('./src/routes/projetoRoutes'));
app.use('/api/sessoes', require('./src/routes/sessaoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));