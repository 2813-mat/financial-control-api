const express = require('express');
const { listarCategorias, criarCategoria, apagarCategoria } = require('../modules/Categorias/controllers/categoriaController');
const { autenticarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/categorias', autenticarToken, criarCategoria);
router.get('/categorias', autenticarToken, listarCategorias);
router.delete('/categorias/:id', autenticarToken, apagarCategoria);

module.exports = router;
