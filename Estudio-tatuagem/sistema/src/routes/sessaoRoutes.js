const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const sessaoController = require('../controllers/sessaoController');

router.get('/', auth, sessaoController.listar);
router.post('/', auth, sessaoController.criar);
router.patch('/:id/data', auth, sessaoController.atualizarData);
module.exports = router;