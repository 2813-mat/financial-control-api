const express = require('express');
const router = express.Router();
const {
    criarUsuario, 
    listarUsuarios, 
    buscarPorEmail, 
    apagarUsuario, 
    ativarUsuario, 
    atualizarTipoUsuario 
} = require('../modules/Usuarios/controllers/usuarioController');
const { autenticarToken } = require('../middlewares/authMiddleware');

router.post('/usuarios', criarUsuario);
router.get('/usuarios', autenticarToken, listarUsuarios);
router.get('/usuarios/email', autenticarToken, buscarPorEmail);
router.delete('/usuarios/:id', autenticarToken, apagarUsuario);
router.put('/usuarios/:id', autenticarToken, ativarUsuario);
router.patch('/usuarios/:id', autenticarToken, atualizarTipoUsuario);

module.exports = router;
