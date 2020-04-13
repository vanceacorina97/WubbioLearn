const express = require('express');
const multer = require('multer');
const path = require('path');
const neo4j = require('neo4j-driver');
const ExifImage = require('exif').ExifImage;
const myModule = require('../config');
const PhotoController = require('../modules/photo/PhotoController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('image');;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/allPhotos', (req, res, next) => {
    let photoController = new PhotoController();
    photoController.getAllPhotos(req, res);
});

router.post('/uploadSinglePhoto', (req, res, next) => {
    var session = myModule.config();
    var photoData = [];
    let exifObj;
    let dataOriginal = "";
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ message: 'Error uploading file' });
        } else if (err) {
            return res.json({ message: 'Some error' });
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                error: "Please upload a file!"
            });
        }
        var metadate = JSON.parse(req.body.metadate);
        console.log(metadate);
        console.log(metadate[0]);
        console.log(metadate.length);

        var goodPath = "uploads/" + file.filename;
        photoData.push({
            filename: file.filename,
            originalName: file.originalname,
            path: goodPath
        });
        try {
            exifObj = new ExifImage({ image: "public/uploads/" + file.filename }, function (error, exifData) {
                if (error)
                    console.log('Error: ' + error.message);
                else {
                    // console.log(exifData);
                    // console.log(exifData.exif.DateTimeOriginal);
                    dataOriginal = exifData.exif.DateTimeOriginal;
                    console.log("data este: " + dataOriginal); // Do something with your data! 
                    logExifData(exifData, photoData, session, metadate, res);
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
        // ---- this is for neo4j ----


        //---------------------------

    });
});

function logExifData(exifData, photoData, session, metadate, res) {
    console.log("AICI")
    console.log(photoData[0].filename);
    console.log(photoData[0].originalName);
    console.log(photoData[0].path);
    console.log(exifData.exif.DateTimeOriginal);
    console.log("GATA")
    session
        .run("MATCH (u:User) WITH u MATCH (p:Project) WHERE ID(u)=0 and ID(p)=20 CREATE (ph:Photo{filename:'"
            + photoData[0].filename + "', originalName:'"
            + photoData[0].originalName + "', path:'"
            + photoData[0].path + "', originalData:'" + exifData.exif.DateTimeOriginal + "'}) <- [:ADDS] - (u),(m:Metadata{name:'"
            + metadate[0] + "'}) - [:CONTAIN] -> (ph), (p) - [:HAS] -> (ph) return ph")
        .then(function (result) {

        })
        .catch(function (err) {
            console.log(err);
        })
    res.json({ message: 'Upload complete!', path: photoData[0].path })
}

router.post('/searchedMetadata', (req, res, next) => {
    var searchWord = JSON.stringify(req.body.searchWord);
    res.send({ 'searchWord': searchWord });
});

module.exports = router;