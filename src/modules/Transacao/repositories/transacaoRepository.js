const prisma = require('../../../prisma/client');

function formatarData(dataString) {
  const [dia, mes, ano] = dataString.split('/');
  const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
  if (isNaN(dataFormatada.getTime())) {
    throw new Error('Data inválida.');
  }
  return dataFormatada;
}

async function encontrarOuCriarCategoria({ nome, tipo, usuarioId }) {
  const tipoEnum = tipo.toUpperCase();

  if (!nome) {
    throw new Error('Nome da categoria é obrigatório');
  }

  let categoria = await prisma.categoria.findFirst({
    where: {
      nome: nome,
      tipo: tipoEnum,
      usuarioId: usuarioId,
    }
  });

  if (!categoria) {
    categoria = await prisma.categoria.create({
      data: {
        nome,
        tipo: tipoEnum,
        usuarioId,
      }
    });
  }

  return categoria;
}

async function criarTransacao({ valor, data, descricao, tipo, usuarioId, categoriaNome }) {
  const tipoEnum = tipo.toUpperCase();
  const valorNumerico = typeof valor === 'string' ? parseFloat(valor.replace(',', '.')) : valor;
  const dataFormatada = formatarData(data);

  if (isNaN(valorNumerico)) {
    throw new Error('Valor inválido.');
  }

  const categoria = await encontrarOuCriarCategoria({
    nome: categoriaNome,
    tipo: tipoEnum,
    usuarioId
  });

  const transacao = await prisma.transacao.create({
    data: {
      valor: valorNumerico,
      data: dataFormatada,
      descricao,
      usuarioId,
      categoriaId: categoria.id
    }
  });

  return transacao;
}

async function listarTransacoesPorUsuario(usuarioId) {
  return prisma.transacao.findMany({
    where: { usuarioId },
    include: {
      categoria: true
    },
    orderBy: {
      data: 'desc'
    }
  });
}

module.exports = {
  criarTransacao,
  listarTransacoesPorUsuario
};
