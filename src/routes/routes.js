const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarioRoutes');
const authRoutes = require('./authRoutes');

router.use('/', usuariosRoutes);
router.use('/auth', authRoutes);

module.exports = router;
