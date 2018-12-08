var {Parse} = require('parse');

Parse.serverURL = "http://localhost:3000/parse";
Parse.initialize('myAppId', 'jskey', 'myMasterKey');

module.exports = Parse