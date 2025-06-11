const express = require('express');
const router = express.Router();
const { autenticarToken } = require('../middlewares/authMiddleware');
const { listarGrupos, criarGrupos } = require('../modules/Grupos/controllers/gruposController');

router.post('/grupos', autenticarToken, criarGrupos);
router.get('/grupos', autenticarToken, listarGrupos);

module.exports = router;
