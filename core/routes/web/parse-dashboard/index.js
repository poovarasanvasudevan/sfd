var ParseDashboard = require('parse-dashboard');

var options1 = { allowInsecureHTTP: false };
var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:3000/parse",
            "appId": "myAppId",
            "masterKey": "myMasterKey",
            "appName": "MyApp"
        }
    ]
},options1);

module.exports = dashboard