const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');
const categoriaRoutes = require('./categoriaRoutes');

router.use(usuariosRoutes);
router.use(authRoutes);
router.use(categoriaRoutes);

module.exports = router;
