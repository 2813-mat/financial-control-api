const logsController = require('../modules/Logs/controllers/logsController');

async function logRequests(req, res, next) {
  try {
    const token = req.headers['authorization']?.split(' ')[1] || null;
    const rota = req.originalUrl;
    const metodo = req.method;

    await logsController.registrarLog({ token, rota, metodo, timestamp: new Date() });

  } catch (err) {
    console.error('Erro ao salvar log:', err);
  }
  
  next();
}

module.exports = logRequests;
