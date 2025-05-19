const express = require('express');
const router = express.Router();

const usuarioController = require('../Components/Usuarios/controllers/usuarioController');

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.delete('/usuarios/:id', usuarioController.apagarUsuario);
router.put('/usuarios/:id', usuarioController.ativarUsuario);

module.exports = router;
