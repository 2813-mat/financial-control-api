const prisma = require('../../../prisma/client');

async function criarCategoria(data) {
  return prisma.categoria.create({ data });
}

async function listarCategorias() {
  return prisma.categoria.findMany();
}

async function buscarPorId(id) {
  return prisma.categoria.findUnique({ where: { id } });
}

async function deletarCategoria(id) {
  return prisma.categoria.delete({ where: { id } });
}

module.exports = { 
    criarCategoria, 
    listarCategorias, 
    buscarPorId,
    deletarCategoria
};
