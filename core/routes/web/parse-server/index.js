var ParseServer = require('parse-server').ParseServer;
var Config = require('../../../Config');

var api = new ParseServer({
    databaseURI: Config.MONGO_DB, // Connection string for your MongoDB database
    cloud: 'cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    clientKey : 'clientKey',
    restAPIKey : 'restAPIKey',
    javascriptKey:"jskey",
    serverURL: 'http://localhost:3000/parse' // Don't forget to change to https if needed

});

module.exports  = api