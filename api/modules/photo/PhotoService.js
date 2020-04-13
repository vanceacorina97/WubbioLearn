const neo4jConfig = require('../../config');

class Service {

    async getAllPhotos() {
        let session = neo4jConfig.config();
        let allPhotos = new Array();
        const result = await session
            .run("MATCH (p:Photo) RETURN p") //asincron
            .then(function (result) {
                result.records.forEach(function (record) {
                    allPhotos.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path
                    });
                });
                console.log(allPhotos);
                return allPhotos; // de asta am nevoie
            })
            .catch(function (error) {
                console.log(error);
                return error; // ast a in caz de eroare
            })
        return result;
    }

}

const PhotoService = new Service();
Object.freeze(PhotoService);

module.exports = PhotoService;