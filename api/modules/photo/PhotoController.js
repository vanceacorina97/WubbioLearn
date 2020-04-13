const PhotoService = require("../photo/PhotoService");

class PhotoController {

    async getAllPhotos(req, res) {
        const photos = await PhotoService.getAllPhotos();
        return res.send(photos);
    }
}

module.exports = PhotoController;