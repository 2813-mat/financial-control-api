const e = require('express');
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
  const role = req.user.role;

  try{
    await usuarioService.apagarUsuario(Number(id), role);
    res.status(204).send();
  }catch(err){
    res.status(500).json({erro: `${err}`})
  }
}

async function ativarUsuario(req, res) {
  const { id } = req.params;
  const role = req.user.role;

  try {
    await usuarioService.ativarUsuario(Number(id), role)
    res.status(200).json({message: 'Usuário ativado com sucesso!'})
  } catch (error) {
    res.status(500).json({erro: `${error}`})
  }
}

async function buscarPorEmail(req, res) {
  const { email } = req.query;

  try {
    const usuarioEmail = await usuarioService.encontrarPorEmail(email);

    if (!usuarioEmail) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuarioEmail)
  } catch (error) {
    res.status(500).json({erro: 'Não foi possível encontrar um usuário com este e-mail.'})
  }
}

async function atualizarTipoUsuario(req, res) {
  const { tipoUsuario } = req.body;
  const email = req.user.email;

  try {
    const response = await usuarioService.atualizarTipoUsuario(tipoUsuario, email);

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ erro: `Ocorreu um erro: ${error}`});
  }
}

async function atualizarSenha(req, res) {
  const {senhaAntiga, senhaNova, email} = req.body;

  try {
    const response = await usuarioService.updatePassword(senhaAntiga, senhaNova, email);
    res.status(200).json({message: 'Senha alterada com sucesso', response})
  } catch (error) {
    res.status(500).json({ erro: `Ocorreu um erro: ${error}`});
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  apagarUsuario,
  ativarUsuario,
  buscarPorEmail,
  atualizarTipoUsuario,
  atualizarSenha
};
