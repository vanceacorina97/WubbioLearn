const neo4jConfig = require('../../config');
const sizeOf = require('image-size');
const PhotoService = require("../photo/PhotoService");
const fs = require("fs");

class Helper {

    session = neo4jConfig.config();

    getDetailsPhoto(file) {
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

    createProps(photoData) {
        return `{filename : "${photoData[0].filename}", originalName : "${photoData[0].originalName}", path : "${photoData[0].path}",width : ${photoData[0].width}, height : ${photoData[0].height}, data : "${photoData[0].data}"}`;
    }

    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`
    }

    async getMetadate(data) {
        let result = [];
        let oldData = [];
        let newData = [];
        const existingMetadate = await this.getAllMetadata();
        if (existingMetadate) {
            data.forEach(metadata => {
                if (existingMetadate.includes(metadata)) {
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
        const session = neo4jConfig.config();
        let metadate = [];
        const query = `MATCH (m:Metadata) return m`;
        const result = await session.run(query)
        result.records.forEach(function (record) {
            metadate.push(record._fields[0].properties.name);
        });
        return metadate;
    }

    async deleteFromDisk(path) {
        try {
            fs.unlinkSync(path)
            return true;
        } catch (err) {
            console.error(err)
        }
        return false;
    }

}

const PhotoHelper = new Helper();
Object.freeze(PhotoHelper);

module.exports = PhotoHelper;