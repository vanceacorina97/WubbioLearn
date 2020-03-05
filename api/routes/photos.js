var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image'); // image - the name of the element in which the image/images is loaded


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/uploadSinglePhoto', (req, res, next) => {
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
        var metadate = req.body.metadate;
        console.log(metadate); 
        console.log(file);
        //---- this is for neo4j ----
        // console.log(file);
        // console.log(file.filename);
        // console.log(file.path);
        //---------------------------
        res.json({ message: 'Upload complete!' })
    });
});

module.exports = router;