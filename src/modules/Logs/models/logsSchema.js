const mongoose = require('mongoose');

const Logs = new mongoose.Schema({
  any: mongoose.Schema.Types.Mixed
}, { strict: false }); 

module.exports = mongoose.model('LogsSchema', Logs);
