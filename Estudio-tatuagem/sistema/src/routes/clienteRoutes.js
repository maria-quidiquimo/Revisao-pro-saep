const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const clienteController = require('../controllers/clienteController');

router.get('/', auth, clienteController.listar);
router.post('/', auth, clienteController.criar);
router.put('/:id', auth, clienteController.atualizar);
module.exports = router;