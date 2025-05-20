const authService = require('../services/authService');

async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const token = await authService.autenticarUsuario(email, senha);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ erro: 'Credenciais inválidas.' });
  }
}

module.exports = { login };
