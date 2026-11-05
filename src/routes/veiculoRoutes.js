const { Router } = require('express');
const veiculoController = require('../controllers/veiculoController');

const router = Router();

router.get('/veiculos', veiculoController.listar);
router.post('/veiculos', veiculoController.criar);
router.put('/veiculos/:id', veiculoController.atualizar);
router.delete('/veiculos/:id', veiculoController.deletar);

module.exports = router;