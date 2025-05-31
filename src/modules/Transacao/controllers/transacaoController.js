const transacaoService = require('../services/transacaoService');

async function criarTransacao(req, res) {
  const { valor, data, descricao, tipo, categoriaNome } = req.body;
  const usuarioId = req.user.id; // Pega o ID do usuário a partir do token JWT

  try {
    const novaTransacao = await transacaoService.criarTransacao({
      valor,
      data,
      descricao,
      tipo,
      categoriaNome,
      usuarioId
    });

    res.status(201).json(novaTransacao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar transação.', detalhe: error.message });
  }
}

async function listarTransacoes(req, res) {
  const usuarioId = req.user.id;

  try {
    const transacoes = await transacaoService.listarTransacoes(usuarioId);
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar transações.', detalhe: error.message });
  }
}

module.exports = {
  criarTransacao,
  listarTransacoes
};
