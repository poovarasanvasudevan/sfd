import axios from "axios"

var instance = axios.create({
    baseURL: 'http://localhost:3000/parse'
});
instance.defaults.headers.common['X-Parse-Application-Id'] = "myAppId";
instance.defaults.headers.common['X-Parse-Master-Key'] = "myMasterKey";


export default {
    rest : function () {
        return instance;
    },

    runFunction : async function(funName , params) {
        return await instance.post("/functions/" + funName , params)
    },

    count : async function (schema) {
        return await instance.get("/classes/" + schema + "?limit=0&count=1");
    }
}