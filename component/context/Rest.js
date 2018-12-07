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

    count : function (schema,callback) {
        instance.get("/classes/" + schema)
            .then((data) => {
                callback(data.count)
            })
    }
}