const express = require('express');
const ExifImage = require('exif').ExifImage;
const PhotoController = require('../modules/photo/PhotoController');
const LoginController = require('../modules/login/LoginController');
const router = express.Router();
const photoController = new PhotoController();


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/allPhotos', LoginController.authenticate, (req, res, next) => {
    photoController.getAllPhotos(req, res);
});

router.post('/uploadPhoto', LoginController.authenticate, (req, res, next) => {
    photoController.uploadPhoto(req, res);
});

router.post('/searchPhotoByWord', LoginController.authenticate, (req, res, next) => {
    photoController.searchPhotosByKeyWord(req, res);
});

router.post('/deletePhoto', LoginController.authenticate, (req, res, next) => {
    photoController.deleteSelectedPhoto(req, res);
})

router.get('/allMetadatas', LoginController.authenticate, (req, res, next) => {
    photoController.getAllMetadatas(req, res);
});

module.exports = router;