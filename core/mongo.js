
var mongoose = require('mongoose');
var Config = require('./Config');
mongoose.connect(Config.MONGO_DB , { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Opened")
});

const utils  = {

    runFunction : async (functionName , params) => {
        return await db.db.eval(functionName)
    }
}


module.exports = {
    mongo : mongoose,
    db : db,
    dbUtils : utils
}