const categoriaRepository = require('../repositories/categoriaRepository');

async function criarCategoria({ nome, tipo, usuarioId }) {
  if (!nome || !tipo || !usuarioId) {
    throw new Error('Nome, tipo e usuário são obrigatórios.');
  }

  const tipoFormatado = tipo.toUpperCase();
  if (!['RECEITA', 'DESPESA'].includes(tipoFormatado)) {
    throw new Error('Tipo deve ser RECEITA ou DESPESA.');
  }

  return categoriaRepository.criarCategoria({
    nome,
    tipo: tipoFormatado,
    usuarioId,
  });
}

async function obterCategorias() {
  return categoriaRepository.listarCategorias();
}

async function apagarCategoria(id) {
  const categoria = await categoriaRepository.deletarCategoria(id);
  if (!categoria) {
    throw new Error('Categoria não encontrada.');
  }
}

module.exports = { 
    criarCategoria, 
    obterCategorias,
    apagarCategoria
};
