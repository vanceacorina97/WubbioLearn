import PhotoGateway from './PhotoGateway';

class PhotoService {
    constructor() {
        this.gateway = new PhotoGateway();

    }

    getAllPhotos() { //data? - inseamna optional la toate la fel
        return this.gateway.getAllPhotos() //data 
            .then((response) => {
                // console.log('------------ ', response);
                return response.data;
            }).catch((err) => Promise.reject(err))
    }
}

export default new PhotoService();