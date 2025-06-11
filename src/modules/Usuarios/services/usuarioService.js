const e = require('express');
const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt')

async function cadastrarUsuario({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw new Error('Nome, email e senha são obrigatórios.');
  }

  const existente = await usuarioRepository.encontrarPorEmail(email);

  if (existente) {
    throw new Error('E-mail já está em uso.');
  }

  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  // Aqui você pode adicionar hash de senha futuramente
  return usuarioRepository.criarUsuario({
    nome,
    email,
    senhaHash,
  });
}

async function obterUsuarios() {
  return usuarioRepository.listarUsuarios();
}

async function encontrarPorEmail(email) {
  return usuarioRepository.encontrarPorEmail(email);
}

async function apagarUsuario(id, role) {
  if(role === 'ADMIN'){
    const usuario = await usuarioRepository.buscarPorId(id);

    if(!usuario){
        throw new Error ('Usuário não encontrado.');
      }

    return usuarioRepository.atualizarStatus(id, false);

  }else{
    throw new Error ('Somente administradores podem excluir usuários.')
  }
}

async function ativarUsuario(id, role){
  if(role === 'ADMIN'){
    const usuario = await usuarioRepository.buscarPorId(id);

    if(!usuario){
      throw new Error ('Usuário não encontrado.');
    }

    return usuarioRepository.ativarUsuario(id, true);
  }else{
    throw new Error ('Somente administradores podem ativar usuários.')
  }
}

async function atualizarTipoUsuario(tipoUsuario, email) {
  const usuario = await usuarioRepository.encontrarPorEmail(email);

  if(!usuario){
    throw new Error ('Não existe usuário com este e-mail');
  }

  return await usuarioRepository.atualizarTipoUsuario(tipoUsuario, email);
}

module.exports = {
  cadastrarUsuario,
  obterUsuarios,
  apagarUsuario,
  ativarUsuario,
  encontrarPorEmail,
  atualizarTipoUsuario
};
