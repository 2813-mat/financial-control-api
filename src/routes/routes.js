const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const transacaoRoutes = require('./transacaoRoutes');

router.use(usuariosRoutes);
router.use(authRoutes);
router.use(categoriaRoutes);
router.use(transacaoRoutes);

module.exports = router;
