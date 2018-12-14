var SSE = require('express-sse');
var sse = new SSE(["INIT" , "TEST1" , "Test2" , "Test 3"]);


module.exports = sse