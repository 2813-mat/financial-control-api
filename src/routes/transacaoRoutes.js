const express = require('express');
const router = express.Router();
const { autenticarToken } = require('../middlewares/authMiddleware');
const { criarTransacao, listarTransacoes } = require('../modules/Transacao/controllers/transacaoController');

router.post('/transacoes', autenticarToken, criarTransacao);
router.get('/transacoes', autenticarToken, listarTransacoes);

module.exports = router;
