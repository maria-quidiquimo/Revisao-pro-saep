const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const projetoController = require('../controllers/projetoController');

router.get('/', auth, projetoController.listar);
router.post('/', auth, projetoController.criar);
module.exports = router;