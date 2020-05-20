const neo4jConfig = require('../../config');
const PhotoHelper = require("../photo/PhotoHelper");
class Service {

    session = neo4jConfig.config();

    async getAllPhotos(search) {
        let allPhotos = new Array();
        let query = "MATCH (p:Photo) RETURN p";
        if (search) {
            query = `MATCH (p:Photo),(m:Metadata) where m.name CONTAINS '${search}' and (p) - [:CONTAIN] -> (m) return p`;
        }
        const result = await this.session
            .run(query)
            .then(function (result) {
                result.records.forEach(function (record) {
                    allPhotos.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path,
                        width: record._fields[0].properties.width,
                        height: record._fields[0].properties.height
                    });
                });
                return allPhotos;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    // aici de facut
    async getAllPhotosFromProject(idProject) {
        let allPhotosFP = new Array();
        const result = await this.session
            .run("MATCH (p:Photo) <- [:HAS] - (pr:Project) where ID(pr) = <id_project> return p")
            .then(function (result) {
                result.records.forEach(function (record) {
                    allPhotosFP.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path
                    });
                });
                return allPhotosFP;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }


    async getSearchedPhotosByKeyWord(word) {
        let allPhotos = new Array();
        return this.session
            .run(`MATCH (p:Photo),(m:Metadata) where m.name CONTAINS '${word}' and (p) <- [:CONTAIN] - (m) return p`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    allPhotos.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path
                    });
                });
                return allPhotos;
            })
            .catch(function (error) {
                throw error;
            })
    }

    async uploadPhoto(photoData) {
        let uploadPhoto = new Array();
        const props = await PhotoHelper.createProps(photoData);
        const query = `MATCH (u:User) WITH u MATCH (p:Project) WHERE ID(u)=49 and ID(p)=0 CREATE (ph:Photo${props}) <- [:ADDS] - (u),(p) - [:HAS] -> (ph) return ph`;
        return this.session
            .run(query)
            .then(function (result) {
                result.records.forEach(function (record) {
                    uploadPhoto.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path
                    });
                });
                return uploadPhoto;
            })
            .catch(function (err) {
                throw err;
            })
    }


    async uploadMetadataTo(filename, metadate) {
        // filename - numele fisierului
        // metadate[0] = oldMetadata care e un array
        // metadata[1] = newMetadata care e un array
        let result = false;
        const oldMetadata = metadate[0].oldData;
        const newMetadata = metadate[1].newData;
        if (oldMetadata.length >= 1) {
            result = await this.uploadMetadata(oldMetadata, 0, filename);
        }
        if (newMetadata.length >= 1) {
            result = await this.uploadMetadata(newMetadata, 1, filename);
        }
        return result;
    }

    async uploadMetadata(metadata, type, filename) {
        let query = '';
        switch (type) {
            case 0:
                query = this.getQuery(metadata, type, filename);
                return this.session
                    .run(query)
                    .then(function (result) {
                        if (result) {
                            return true;
                        }
                        return false;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            case 1:
                query = this.getQuery(metadata, type, filename);
                return this.session
                    .run(query)
                    .then(function (result) {
                        if (result) {
                            return true;
                        }
                        return false;
                    })
                    .catch(function (err) {
                        throw err;
                    })
            default:
                return false;
        }

    }

    getQuery(metadata, type, filename) {
        let query = '';
        switch (type) {
            case 0:
                query = `match (p:Photo) with p match (m:Metadata) where p.filename = '${filename}' and m.name IN [`;
                for (let index = 0; index < metadata.length; index++) {
                    if (index === metadata.length - 1) {
                        query += `'${metadata[index]}'`
                    } else {
                        query += `'${metadata[index]}', `
                    }
                }
                query += '] create (m) <- [:CONTAIN] - (p) return *';
                break;
            case 1:
                query = `match (p:Photo{filename:'${filename}'}) create `;
                for (let index = 0; index < metadata.length; index++) {
                    if (index === metadata.length - 1) {
                        query += `(:Metadata{name:'${metadata[index]}'}) <- [:CONTAIN] - (p) `
                    } else {
                        query += `(:Metadata{name:'${metadata[index]}'}) <- [:CONTAIN] - (p), `
                    }
                }
                query += 'return p';
                break;
        }
        return query;
    }

}



const PhotoService = new Service();
Object.freeze(PhotoService);

module.exports = PhotoService;