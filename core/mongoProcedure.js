db.system.js.save(
    {
        _id: "getCountOfAllCollection",
        value: function () {
            var collections = db.getCollectionNames()
            var output = []
            for (var i = 0; i < collections.length; i++) {
                var name = collections[i]
                if (!name.startsWith('system') && !name.startsWith("_")) {
                    var c = db.getCollection(name).count()
                    output.push({
                        name: name,
                        count: c
                    })
                }
            }
            return output
        }
    }
)


db.system.js.save(
    {
        _id: "getCollectionsStat",
        value: function () {
            var collections = db.getCollectionNames()
            var output = []
            for (var i = 0; i < collections.length; i++) {
                var name = collections[i]
                if (!name.startsWith('system') && !name.startsWith("_")) {
                    var c = db.getCollection('LDAPAccounts').stats()
                    output.push({
                        name: name,
                        count: c.count,
                        size: c.size,
                        indexSize: c.totalIndexSize,
                        isok: c.ok,
                        storageSize: c.storageSize
                    })
                }
            }
            return output
        }
    }
)