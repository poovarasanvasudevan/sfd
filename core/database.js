const sql = require('mssql')

const config = {
    user: 'CTSdevuser',
    password: 'CT$dev@se7Pa',
    server: '10.165.135.80',
    database: 'ARSystem_DEV',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
