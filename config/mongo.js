const mongoose = require('mongoose');

mongoURI = process.env.MONGO_CONNECTION_URI;

async function connectMongoDB() {
  try {
    await mongoose.connect(mongoURI, {
      authSource: 'admin',
      dbName: 'Logs'
    });
    console.log('MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectMongoDB;
