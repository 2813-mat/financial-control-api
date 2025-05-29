const logsSchema = require("../models/logsSchema");

async function crieLog(data) {
    const log = await logsSchema.insertMany(data);

    if(log){
        console.log('Log gravado no banco.')
    }

    return log;
}

module.exports = {
    crieLog
}