const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nxt = next({ dev })
const handle = nxt.getRequestHandler()

const { join } = require('path')
const { parse } = require('url')
var where = require('node-where');
var compression = require('compression')
var helmet = require('helmet')
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Config = require('./core/Config');
var Agenda = require('agenda')
nxt.prepare()
    .then(() => {
        const app = express()
        app.use(logger('dev'));
        app.use(compression())
        app.use(helmet())
        // app.use(express.json());
        // app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
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
        // app.use(function(req, res, next) {
        //     where.is(req.ip, function(err, result) {
        //         req.geoip = result;
        //         next();
        //     });
        // });
        app.use('/parse', api);
        app.use('/dashboard', dashboard);

        app.get('*', (req, res) => {
            return handle(req, res)
        })
        // var server = http.createServer(app);
        // deepstream.set( 'httpServer', server );
        // deepstream.start();

        const agenda = new Agenda({db: {address: Config.MONGO_DB, collection: '_agenda_jobs'}});

        agenda.define('ping', (job, done) => {
            console.log("ping")
            done();

        });
        (async function() { // IIFE to give access to async/await
            await agenda.start();
            agenda.every('2 seconds', 'ping');
        })()

        app.listen( port, function(){
            console.log(`> Ready on http://localhost:${port}`)
        });
    })