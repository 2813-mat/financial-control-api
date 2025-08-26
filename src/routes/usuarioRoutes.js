const express = require('express');
const router = express.Router();
const {
    criarUsuario, 
    listarUsuarios, 
    buscarPorEmail, 
    apagarUsuario, 
    ativarUsuario, 
    atualizarTipoUsuario, 
    atualizarSenha
} = require('../modules/Usuarios/controllers/usuarioController');
const { autenticarToken } = require('../middlewares/authMiddleware');

router.post('/usuarios', criarUsuario);
router.put('/usuarios/update-password', atualizarSenha);
router.get('/usuarios', autenticarToken, listarUsuarios);
router.get('/usuarios/email', autenticarToken, buscarPorEmail);
router.delete('/usuarios/:id', autenticarToken, apagarUsuario);
router.put('/usuarios/:id', autenticarToken, ativarUsuario);
router.patch('/usuarios/:id', autenticarToken, atualizarTipoUsuario);

module.exports = router;
