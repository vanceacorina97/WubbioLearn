import PhotoGateway from './PhotoGateway';

class PhotoService {
    constructor() {
        this.gateway = new PhotoGateway();

    }

    getAllPhotos(data = "") {
        return this.gateway.getAllPhotos(data)
            .then((response) => {
                return response.data;
            }).catch((err) => Promise.reject(err))
    }
}

export default new PhotoService();