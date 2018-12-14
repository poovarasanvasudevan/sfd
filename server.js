const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nxt = next({dev})
const handle = nxt.getRequestHandler()


var compression = require('compression')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var Config = require('./core/Config')
var Agenda = require('agenda')

nxt.prepare()
    .then(() => {
        const app = express()
        app.use(logger('dev'))
        app.use(compression())
        app.use(helmet())
        app.use(cookieParser())


        app.use('/api', require('./core/routes/api'))
        app.use('/web', require('./core/routes/web'))
        app.use('/parse', require('./core/routes/web/parse-server'))
        app.use('/dashboard', require('./core/routes/web/parse-dashboard'))
        app.get('*', (req, res) => {
            return handle(req, res)
        })


        const agenda = new Agenda({db: {address: Config.MONGO_DB, collection: '_agenda_jobs'}});
        (async function () { // IIFE to give access to async/await
            await agenda.start()
        })()

        app.listen(port, function () {
            console.log(`> Ready on http://localhost:${port}`)
        })
    })