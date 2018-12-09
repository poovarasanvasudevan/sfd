
var mongoose = require('mongoose');
var Config = require('./Config');
mongoose.connect(Config.MONGO_DB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Opened")
});

module.exports = {
    mongo : mongoose,
    db : db
}