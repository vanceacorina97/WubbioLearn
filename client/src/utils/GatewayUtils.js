import axios from 'axios';
import config from '../config';

const CONTENT_TYPE = 'application/json';
const CONTENT_TYPE_UPLOAD = 'multipart/form-data';
const GET_METHOD = 'GET';
const POST_METHOD = 'POST';

export default class Gateway {
    get config() {
        return config;
    }

    get baseUrl() {

        const backendUrl = `${this.config.BACKEND_PROTOCOL}${this.config.BACKEND_HOSTNAME}:${this.config.BACKEND_PORT}`
        return `${backendUrl}`;
    }

    get headers() {
        return {
            'Content-Type': CONTENT_TYPE,
            'Authorization': `bearer ${localStorage.getItem('token')}`,
        };
    }

    get headersImage() {
        return {
            'Content-Type': CONTENT_TYPE_UPLOAD,
            'Authorization': `bearer ${localStorage.getItem('token')}`,
        };
    }

    get client() {
        return axios.create({
            baseURL: this.baseUrl,
            headers: this.headers,
        });
    }

    
    get clientImage() {
        return axios.create({
            baseURL: this.baseUrl,
            headers: this.headersImage,
        });
    }

    postRequest(url, data) {
        const options = this.getRequestOptions(POST_METHOD, url, data);

        return this.client(options)
            .then(this.onSuccess)
            .catch(this.onError);
    }

    postImageRequest(url, data) {
        const options = this.getRequestOptions(POST_METHOD, url, data);

        return this.clientImage(options)
            .then(this.onSuccess)
            .catch(this.onError);
    }

    getRequest(url, data) {
        const options = this.getRequestOptions(GET_METHOD, url, data);


        return this.client(options)
            .then(this.onSuccess)
            .catch(this.onError);
    }

    onSuccess(response) {
        return response;
    }

    onError(error) {
        return Promise.reject(error.response || error.message);
    }

    getRequestOptions(method, endpoint, data) {
        const options = {};

        options.method = method;
        options.url = `${endpoint}`;
        if (method === GET_METHOD) {
            options.params = data;
        } else {
            options.data = data;
        }


        return options;
    }
}
