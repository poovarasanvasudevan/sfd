db.system.js.save(
    {
        _id : "getCountOfAllCollection" ,
        value : function (){
            var collections = db.getCollectionNames();
            var output = [];
            for(var i = 0; i < collections.length; i++){
                var name = collections[i];
                if(!name.startsWith('system') && !name.startsWith("_")){
                    var c = db.getCollection(name).count() ;
                    output.push([name , c]);
                }
            }
            return output
        }
    }
);