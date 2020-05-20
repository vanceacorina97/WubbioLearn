const neo4jConfig = require('../../config');
const sizeOf = require('image-size');
const PhotoService = require("../photo/PhotoService");

class Helper {

    session = neo4jConfig.config();

    async getDetailsPhoto(file) {
        const imagePath = "public/uploads/" + file.filename;
        const goodPath = "uploads/" + file.filename;
        let photoData = [];
        let dimensions = sizeOf(imagePath);
        const currentData = this.getCurrentDate();
        photoData.push({
            filename: file.filename,
            originalName: file.originalname,
            path: goodPath,
            width: dimensions.width,
            height: dimensions.height,
            data: currentData
        });
        return photoData;
    }

    async createProps(photoData) {
        return `{filename : "${photoData[0].filename}", originalName : "${photoData[0].originalName}", path : "${photoData[0].path}",width : ${photoData[0].width}, height : ${photoData[0].height}, data : "${photoData[0].data}"}`;
    }

    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`
    }

    async getMetadate(data) {
        let result = new Array();
        let oldData = new Array();
        let newData = new Array();
        const currentMetadate = await this.getAllMetadata();
        if (currentMetadate) {
            data.forEach(metadata => {
                if (currentMetadate.includes(metadata)) {
                    oldData.push(metadata);
                } else {
                    newData.push(metadata);
                }
            });
            result.push({ 'oldData': oldData });
            result.push({ 'newData': newData });
        }
        return result;
    }

    async getAllMetadata() {
        let metadate = new Array();
        const query = `MATCH (m:Metadata) return m`;
        return this.session
            .run(query)
            .then(function (result) {
                result.records.forEach(function (record) {
                    metadate.push(record._fields[0].properties.name);
                });
                return metadate;
            })
            .catch(function (err) {
                throw err;
            })
    }

}

const PhotoHelper = new Helper();
Object.freeze(PhotoHelper);

module.exports = PhotoHelper;