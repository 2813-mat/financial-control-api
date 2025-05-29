const { crieLog } = require("../services/logService");

async function registrarLog(dados) {

    crieLog(dados);

}


module.exports = { registrarLog };
