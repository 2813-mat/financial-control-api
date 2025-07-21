const grupoRepository = require('../repositories/grupoRepository');

async function criarGrupo(nome, userId) {
  return await grupoRepository.criarGrupos(nome, userId);
}

async function listarGrupos() {
  const grupos = await grupoRepository.listarGrupos();

  if (!grupos || grupos.length === 0) {
    throw new Error('Nenhum grupo encontrado');
  }

  return grupos;  
}

module.exports = {
  criarGrupo,
  listarGrupos
};
