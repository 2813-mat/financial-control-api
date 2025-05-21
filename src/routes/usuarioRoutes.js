const express = require('express');
const router = express.Router();

const usuarioController = require('../modules/Usuarios/controllers/usuarioController');
const { autenticarToken } = require('../middlewares/authMiddleware');

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', autenticarToken, usuarioController.listarUsuarios);
router.get('/usuarios/email', autenticarToken, usuarioController.buscarPorEmail);
router.delete('/usuarios/:id', autenticarToken, usuarioController.apagarUsuario);
router.put('/usuarios/:id', autenticarToken, usuarioController.ativarUsuario);

module.exports = router;
