const jwt = require('jsonwebtoken');
const logsController = require('../modules/Logs/controllers/logsController');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

async function logRequests(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || null;
  const rota = req.originalUrl;
  const metodo = req.method;

  let userId = null;
  let email = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      email = decoded.email;
    } catch (err) {
      console.warn('Token inválido ao tentar registrar log:', err.message);
    }
  }

  const originalJson = res.json;

  res.json = async function (body) {
    if (res.statusCode >= 400) {
      const erro = body?.erro || body?.message || 'Erro não especificado';

      try {
        await logsController.registrarLog({
          token,
          userId,
          email,
          rota,
          metodo,
          statusCode: res.statusCode,
          erro,
          timestamp: new Date()
        });
      } catch (err) {
        console.error('Erro ao salvar log de erro:', err);
      }
    }

    return originalJson.call(this, body);
  };

  res.on('finish', async () => {
    if (res.statusCode < 400) {
      try {
        await logsController.registrarLog({
          token,
          userId,
          email,
          rota,
          metodo,
          statusCode: res.statusCode,
          timestamp: new Date()
        });
      } catch (err) {
        console.error('Erro ao salvar log de sucesso:', err);
      }
    }
  });

  next();
}

module.exports = logRequests;
