const BASEURL = "http://10.165.125.177:8443/ctsspi"
const LOGIN_URL = BASEURL + "/oauth/token"
const {poolPromise} = require('../core/database')
const queries = require('./api/queries')
//const {mongo , db , dbUtils} = require('../core/mongo')
const {utils , pg} = require('../core/postgres')

async function createUser(username, password) {
    var user = new Parse.User()
    user.set('username', username)
    user.set('password', password)
    var signupResult = await user.signUp()
    return user
}


async function updateUser(user, password) {
    user.set("password", password)
    return user.save(null, {useMasterKey: true})
}


function findUser(username) {
    var query = new Parse.Query(Parse.User)
    query.equalTo("username", username)
    return query.first()
}


function createOrUpdateUser(username, password) {
    return findUser(username).then(function (user) {
        return (user) ? updateUser(user, password) : createUser(username, password)
    })
}



Parse.Cloud.define("allCount", async (request) => {
    const aObj =  await utils.runFunction("get_all_table_record_count" , []);
    var retObj = [];

    for(i=0;i<aObj.length;i++) {
        retObj.push([aObj[i].tablename , aObj[i].datacount] )
    }
    return retObj;
})


Parse.Cloud.define('saveNotes', async (request) => {
    return sql.runQuery("select 1+1")
})

Parse.Cloud.job("NOTES_SYNC_JOB", async function (request, status) {
    const {params, headers, log, message} = request
    message("NOTES Sync Started")

    console.time('NOTESSYNC')

    const pool = await poolPromise
    const resultq = await pool.request().query(queries.STICKYNOTES_SYNC_QUERY)

    try {
        const schema = new Parse.Schema('StickyNotes')
        schema.purge()
        const Notes = Parse.Object.extend("StickyNotes")

        var notesArray = []
        for (i = 0; i < resultq.recordset.length; i++) {
            var notes = resultq.recordset[i]
            var snotes = new Notes()
            snotes.set("summary", notes['Summary'])
            snotes.set("note", notes['Note'])
            snotes.set("status", notes['Status'])
            snotes.set("user", notes['Submitter'])
            notesArray.push(snotes)
        }
        await Parse.Object.saveAll(notesArray, {useMasterKey: true})
        console.timeEnd('NOTESSYNC')
    } catch (e) {
        console.error(e)
        return "FAILED"
    }
})

Parse.Cloud.job("LDAP_SYNC_JOB", async function (request, status) {

    const {params, headers, log, message} = request
    message("LDAP Accounts Sync Started")

    console.time('ADSYNC')

    const pool = await poolPromise
    const resultq = await pool.request().query(queries.LDAP_SYNC_QUERY)


    try {
        const schema = new Parse.Schema('LDAPAccounts')
        schema.purge()

        const LDAP = Parse.Object.extend("LDAPAccounts")


        var allLdap = []
        for (i = 0; i < resultq.recordset.length; i++) {
            var ldapAccount = resultq.recordset[i]

            var ldap = new LDAP()
            ldap.set('host', ldapAccount.host)
            ldap.set('port', ldapAccount.port)
            ldap.set('username', ldapAccount.username)
            ldap.set('adpassword', ldapAccount.password)
            ldap.set('base', ldapAccount.base)
            ldap.set('domain', ldapAccount.domain)
            ldap.set('filter', ldapAccount.filter)
            ldap.set('status', ldapAccount.status)
            ldap.set('client', ldapAccount.client)
            ldap.set('searchdn', ldapAccount.ldap_search_dn)
            ldap.set('pretext', ldapAccount.user_pre_text)
            ldap.set('posttext', ldapAccount.user_post_text)
            ldap.set('executionorder', ldapAccount.execution_order)

            allLdap.push(ldap)

        }
        await Parse.Object.saveAll(allLdap, {useMasterKey: true})
        console.timeEnd('ADSYNC')
        return "SUCCESS"
    } catch (e) {
        console.error(e)
        return "FAILED"
    }
})

Parse.Cloud.define("menu", async (request) => {
    var user = request.user
    var menu = Parse.Config.get('ANDROID_MENU')
})

Parse.Cloud.define("login", async (request) => {
    var userName = request.params.username
    var password = request.params.password

    const pool = await poolPromise
    const resultq = await pool.request()
        .query('select 1+1')

    console.log(resultq)

    var res = await Parse.Cloud.httpRequest({
        method: 'POST',
        followRedirects: true,
        url: LOGIN_URL,
        params: {
            'username': userName,
            'password': password,
            'grant_type': 'password'
        },
        headers: {
            'Authorization': 'Basic Y3Rzc3A6c2VjcmV0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    var response = JSON.parse(res.text)

    if (response.access_token) {
        var user = createOrUpdateUser(userName, password)
        return {
            error: false,
            response: {
                username: userName,
                password: password
            }

        }
    } else {
        return {
            error: true,
            response: {
                error: res.text.error
            }
        }
    }
})
