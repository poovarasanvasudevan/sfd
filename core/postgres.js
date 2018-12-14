const pgp = require('pg-promise')();
const Config = require('./Config')

const initOptions = {
    pgNative: true
};
const db = pgp(Config.POSTGRES,initOptions);


const nutils = {
    runFunction : async function (functionName , params) {
        return await db.func(functionName , params)
    }
}


module.exports = {
    db : db ,
    utils : nutils
}