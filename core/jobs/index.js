var Agenda = require('agenda')
var Config = require('./core/Config');
const agenda = new Agenda({db: {address: Config.MONGO_DB, collection: '_agenda_jobs'}});

agenda.define('ping', (job, done) => {
    console.log("pong")
    io.sockets.emit('hi', 'everyone');
    done();
});

module.exports = agenda