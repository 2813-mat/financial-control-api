const transacaoRepository = require('../repositories/transacaoRepository');

async function criarTransacao(dadosTransacao) {
  // Espera-se que os dados incluam: valor, data, descricao, tipo, categoriaNome, usuarioId
  const transacao = await transacaoRepository.criarTransacao(dadosTransacao);
  return transacao;
}

async function listarTransacoes(usuarioId) {
  const transacoes = await transacaoRepository.listarTransacoesPorUsuario(usuarioId);
  return transacoes;
}

module.exports = {
  criarTransacao,
  listarTransacoes
};
