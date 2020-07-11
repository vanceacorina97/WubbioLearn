const PhotoService = require("../photo/PhotoService");
const PhotoHelper = require("../photo/PhotoHelper");
const path = require('path');
const paths = require('../../constants');
class PhotoController {

    async getAllPhotos(req, res) {
        const search = req.query.search;
        const photos = await PhotoService.getAllPhotos(search);
        return res.send(photos);
    }
    async getAllMetadatas(req, res) {
        const metadatas = await PhotoService.getAllMetadatas();
        return res.send(metadatas)
    }
    async searchPhotosByKeyWord(req, res) {
        const photos = await PhotoService.getSearchedPhotosByKeyWord(req.body.keyWord);
        return res.send(photos);
    }

    addPhoto = async (file) => {
        const photoData = await PhotoHelper.getDetailsPhoto(file);
        return PhotoService.uploadPhoto(photoData, req.user.id, req.projectId);
    }


    async uploadPhotos(req, res) {
        const { files } = req;
        let allMetadate = [];
        let uniqueMetadate = [];
        Object.keys(req.body).filter((key) => {
            if (key.match(/metadate_/)) {
                return key;
            }
        }).forEach((key) => allMetadate = [...allMetadate, ...req.body[key].split(',')]);
        uniqueMetadate = allMetadate.filter((value, index, self) => self.indexOf(value) === index);
        uniqueMetadate = uniqueMetadate.filter(item => item !== '');
        const convertMetadate = await PhotoHelper.getMetadate(uniqueMetadate);
        if (convertMetadate[1].newData.length > 0) {
            await PhotoService.uploadAllMetadata(convertMetadate);
        }
        let promises = files.map(async (file) => {
            const photoData = PhotoHelper.getDetailsPhoto(file);
            await PhotoService.uploadPhoto(photoData, req.user.id, req.projectId);
            const dataMetadata = req.body[`metadate_${file.originalname}`];
            let metadate = dataMetadata.split(',');
            metadate = metadate.filter(item => item !== '');
            return await PhotoService.uploadMetadataTo(file, metadate);
        })
        await Promise.all(promises);
        return res.json({ message: 'Upload completed!', idProject: req.projectId });
    }

    async deleteSelectedPhoto(req, res) {
        const idPhoto = req.body.id;
        const photoPath = path.join(paths.PUBLICPATH, req.body.photoPath);
        const deleteFromDB = await PhotoService.deletePhoto(idPhoto);
        if (deleteFromDB) {
            const deleteFromDisk = await PhotoHelper.deleteFromDisk(photoPath);
            if (deleteFromDisk) {
                res.status(200).json({ message: "Delete succesfully!" });
                return;
            }
        }
        res.status(500).json({ message: "Can't delete this photo!" });
    }

    async getAllPhotosFromProject(req, res) {
        let idProject =  req.query.idProject;
        let projectDetails = req.detailsProject;
        const photos = await PhotoService.getAllPhotosFromProject(idProject); 
        return res.json({projectDetails: projectDetails, photos: photos})
    }
}

module.exports = PhotoController;