import GatewayUtils from '../../utils/GatewayUtils';

export default class PhotoGateway extends GatewayUtils {
    getAllPhotos() { //data
        return this.getRequest('/photos/allPhotos'); //,data !!!Odata ce s-o trimis cu payload trebuie schimbat in post
    }
}
