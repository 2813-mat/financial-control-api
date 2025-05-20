const categoriaService = require('../services/categoriaService');

async function criarCategoria(req, res) {
  const { nome, tipo } = req.body;
  const usuarioId = req.user?.id; 

  try {
    const novaCategoria = await categoriaService.criarCategoria({ nome, tipo, usuarioId });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}

async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaService.obterCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar categorias.' });
  }
}

async function apagarCategoria(req, res) {
  const { id } = req.params;

  try {
    await categoriaService.apagarCategoria(Number(id));
    res.status(200).json({ message: 'Categoria excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

module.exports = { 
    criarCategoria, 
    listarCategorias,
    apagarCategoria 
};
