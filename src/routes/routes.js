const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('API de Controle Financeiro - Rotas funcionando!');
});

// Exemplo de rota de usuário
router.get('/usuarios', (req, res) => {
  res.json({ mensagem: 'Listar usuários (exemplo)' });
});

module.exports = router;
