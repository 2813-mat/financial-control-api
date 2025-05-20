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

async function apagarUsuario(id) {
  const usuario = await usuarioRepository.buscarPorId(id);

  if(!usuario){
    throw new Error ('Usuário não encontrado.');
  }

  return usuarioRepository.atualizarStatus(id, false);
}

async function ativarUsuario(id){
  const usuario = await usuarioRepository.buscarPorId(id);

   if(!usuario){
    throw new Error ('Usuário não encontrado.');
  }

  return usuarioRepository.ativarUsuario(id, true);
}

module.exports = {
  cadastrarUsuario,
  obterUsuarios,
  apagarUsuario,
  ativarUsuario,
  encontrarPorEmail
};
