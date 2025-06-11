const prisma = require('../../../prisma/client');

async function listarGrupos() {
  return await prisma.grupo.findMany({
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      },
      usuarios: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      }
    }
  });
}

async function criarGrupos(nome, userId) {
  const grupoCriado = await prisma.grupo.create({
    data: {
      nome,
      criadorId: userId
    },
    include: {
      criador: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      }
    }
  });

  await prisma.usuario.update({
    where: { id: userId },
    data: { grupoId: grupoCriado.id }
  });

  return grupoCriado;
}

module.exports = {
  listarGrupos,
  criarGrupos
};
