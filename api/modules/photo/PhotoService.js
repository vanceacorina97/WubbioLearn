const neo4jConfig = require('../../config');
const PhotoHelper = require("../photo/PhotoHelper");
const { session } = require('neo4j-driver');
class Service {

    session = neo4jConfig.config();

    async getAllPhotos(search) {
        let allPhotos = new Array();
        let query = "MATCH (p:Photo) RETURN p";
        if (search) {
            query = `MATCH (p:Photo),(m:Metadata) where m.name CONTAINS '${search}' and (p) - [:CONTAIN] -> (m) return distinct p`;
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

    async getAllPhotosFromProject(idProject) {
        let allPhotosFP = new Array();
        const result = await this.session
            .run(`MATCH (p:Photo) <- [:HAS] - (pr:Project) where ID(pr) = ${idProject} return p`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    allPhotosFP.push({
                        id: record._fields[0].identity.low,
                        originalName: record._fields[0].properties.originalName,
                        path: record._fields[0].properties.path,
                        width: record._fields[0].properties.width,
                        height: record._fields[0].properties.height
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


    async uploadAllMetadata(metadate) {
        const newMetadata = metadate[1].newData;
        const query = this.createQuery(newMetadata);
        return this.session.run(query);
    }

    uploadPhoto(photoData, idUser, idProject) {
        const session = neo4jConfig.config();
        const props = PhotoHelper.createProps(photoData);
        const query = `MATCH (u:User) WITH u MATCH (p:Project) WHERE ID(u)=${idUser} and ID(p)=${idProject} CREATE (ph:Photo${props}) <- [:ADDS] - (u),(p) - [:HAS] -> (ph) return ph`;
        return session.writeTransaction((transaction) => {
            transaction.run(query);
        });
    }

    createQuery(metadate) {
        let query = 'CREATE ';
        let size = metadate.length;
        metadate.forEach((metadata, index) => {
            index !== size - 1 ? query += `(:Metadata{name:'${metadata}'}), ` : query += `(:Metadata{name:'${metadata}'})`;
        })
        return query;
    }

    async uploadMetadataTo(file, metadate) {
        let query = '';
        if (metadate.length) {
            const session = neo4jConfig.config();
            let metadatas = '[ ';
            metadate.forEach((metadata, index) => {
                index !== metadate.length - 1 ? metadatas += `'${metadata}', ` : metadatas += `'${metadata}'] `;
            })
            query = `match (p:Photo), (m:Metadata)  where p.filename='${file.filename}' and m.name IN ${metadatas} create (p) - [:CONTAIN] -> (m);`;
            return session.run(query);
        } else {
            return;
        }
    }

    async deletePhoto(idPhoto) {
        const result = await this.session
            .run(`MATCH (p:Photo) WHERE ID(p) = ${idPhoto} OPTIONAL MATCH (p) -[r] -() DELETE r,p `)
            .then(function (result) {
                if (result.summary.counters._stats.nodesDeleted)
                    return true
                return false;
            })
            .catch(function (error) {
                return error;
            })
        return result;
    }

    async getAllMetadatas(){
        let allMetadatas = new Array();
        return this.session
            .run(`match (m:Metadata) return distinct m`)
            .then(function (result) {
                result.records.forEach(function (record) {
                    allMetadatas.push( record._fields[0].properties.name );
                });
                return allMetadatas;
            })
            .catch(function (error) {
                throw error;
            })
    }

}



const PhotoService = new Service();
Object.freeze(PhotoService);

module.exports = PhotoService;