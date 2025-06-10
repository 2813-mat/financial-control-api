const prisma = require('../../../prisma/client');

async function encontrarPorEmail(email) {
  return prisma.usuario.findUnique({ where: { email } });
}

async function criarUsuario(data) {
  return prisma.usuario.create({ data });
}

async function listarUsuarios() {
  return prisma.usuario.findMany();
}

async function buscarPorId(id) {
  return prisma.usuario.findUnique({ 
    where: {id}
  })
}

async function atualizarStatus(id, status){
  return prisma.usuario.update({
    where: {id},
    data: { ativo: status},
  });
}

async function ativarUsuario(id, status) {
  return prisma.usuario.update({
    where: {id},
    data: { ativo: status},
  });
}

async function atualizarTipoUsuario(tipoUsuario, email) {
  const tipoEnum = tipoUsuario.toUpperCase();
  
  return prisma.usuario.update({
    where: { email },
    data: { tipo: tipoEnum},
  })
}

module.exports = {
  encontrarPorEmail,
  criarUsuario,
  listarUsuarios,
  buscarPorId,
  atualizarStatus,
  ativarUsuario,
  atualizarTipoUsuario
};
