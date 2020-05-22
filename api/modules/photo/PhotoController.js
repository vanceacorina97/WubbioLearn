const PhotoService = require("../photo/PhotoService");
const PhotoHelper = require("../photo/PhotoHelper");
const ErrorNotFound = require('../../system/errors/ErrorNotFound');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    // console.log('file mimetype -', file.mimetype);
    const filetypes = 'jpeg/jpg'
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb("File upload only supports the following filetypes - " + filetypes);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('image');
class PhotoController {

    async getAllPhotos(req, res) {
        const search = req.query.search;
        const photos = await PhotoService.getAllPhotos(search);
        return res.send(photos);
    }

    async searchPhotosByKeyWord(req, res) {
        const photos = await PhotoService.getSearchedPhotosByKeyWord(req.body.keyWord);
        return res.send(photos);
    }

    async uploadPhoto(req, res) {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading file' });
            } else if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    error: "Please upload a file!"
                });
            }
            const photoData = await PhotoHelper.getDetailsPhoto(file);
            const response = await PhotoService.uploadPhoto(photoData);
            const data = JSON.parse(req.body.metadate);
            if (data.length) {
                const metadate = await PhotoHelper.getMetadate(data);
                if (metadate) {
                    const result = await PhotoService.uploadMetadataTo(photoData[0].filename, metadate);
                }
            }
            if (response) {
                return res.json({ message: 'Upload completed!' });
            }
            return res.status(400).json({ message: "Can't upload photo!" });

        });


    }

}

module.exports = PhotoController;