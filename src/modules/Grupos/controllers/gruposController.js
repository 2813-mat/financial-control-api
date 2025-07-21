const grupoService = require('../services/grupoService');

async function criarGrupos(req, res) {
  const { nome } = req.body;
  const user = req.user.id;

  try {

    if (!nome || !user) {
      return res.status(400).json({ erro: 'Nome do grupo e usuário são obrigatórios.' });
    }

    const grupoCriado = await grupoService.criarGrupo(nome, user);
    res.status(201).json(grupoCriado);
  } catch (error) {
    res.status(500).json({ erro: `Erro ao criar grupo: ${error.message}` });
  } 
}

async function listarGrupos(req, res) {
  try {
    const grupos = await grupoService.listarGrupos();
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({ erro: `Erro ao listar grupos: ${error.message}` });
  }
}

module.exports = {
  criarGrupos,
  listarGrupos
};