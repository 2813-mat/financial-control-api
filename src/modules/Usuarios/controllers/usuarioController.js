const usuarioService = require('../services/usuarioService');

async function criarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = await usuarioService.cadastrarUsuario({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.obterUsuarios();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
}

async function apagarUsuario(req, res) {
  const { id } = req.params;

  try{
    await usuarioService.apagarUsuario(Number(id));
    res.status(204).send();
  }catch(err){
    res.status(500).json({erro: 'Não foi possível excluir este usuário.'})
  }
}

async function ativarUsuario(req, res) {
  const { id } = req.params;

  try {
    await usuarioService.ativarUsuario(Number(id))
    res.status(200).json({message: 'Usuário ativado com sucesso!'})
  } catch (error) {
    res.status(500).json({erro: 'Não foi possível ativar este usuário.'})
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  apagarUsuario,
  ativarUsuario
};
