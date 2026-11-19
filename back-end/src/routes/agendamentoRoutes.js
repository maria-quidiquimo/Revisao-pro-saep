const { Router } = require('express');
const agendamentoController = require('../controllers/agendamentoController');

const router = Router();

router.get('/agendamentos', agendamentoController.listar);
router.post('/agendamentos', agendamentoController.criar);
router.put('/agendamentos/:id', agendamentoController.atualizarData);
router.delete('/agendamentos/:id', agendamentoController.deletar);

module.exports = router;
