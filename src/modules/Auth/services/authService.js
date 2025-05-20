const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { encontrarPorEmail } = require('../../Usuarios/services/usuarioService');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

async function autenticarUsuario(email, senha) {
  const usuario = await encontrarPorEmail(email);
  if (!usuario) throw new Error('Usuário não encontrado.');

  const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaValida) throw new Error('Senha incorreta.');

  const payload = { id: usuario.id, email: usuario.email };
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
}

module.exports = { autenticarUsuario };