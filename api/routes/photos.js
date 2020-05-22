const express = require('express');
const ExifImage = require('exif').ExifImage;
const PhotoController = require('../modules/photo/PhotoController');
const LoginController = require('../modules/login/LoginController');
const router = express.Router();




/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/allPhotos', (req, res, next) => {
    const photoController = new PhotoController();
    photoController.getAllPhotos(req, res);
});

router.post('/uploadPhoto', (req, res, next) => {
    const photoController = new PhotoController();
    photoController.uploadPhoto(req, res);
});

router.post('/searchPhotoByWord', LoginController.authenticate, (req, res, next) => {
    const photoController = new PhotoController();
    photoController.searchPhotosByKeyWord(req, res);
});

module.exports = router;