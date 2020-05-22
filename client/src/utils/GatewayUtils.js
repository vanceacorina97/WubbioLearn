import axios from 'axios';
import config from '../config';

const CONTENT_TYPE = 'application/json';
const GET_METHOD = 'GET';
const POST_METHOD = 'POST';

export default class Gateway {
    get config() {
        return config;
    }

    get baseUrl() {

        const backendUrl = `${this.config.BACKEND_PROTOCOL}${this.config.BACKEND_HOSTNAME}:${this.config.BACKEND_PORT}`
        //  console.log('baseUrl-------- ',  `${backendUrl}`);
        return `${backendUrl}`;
    }

    get headers() {
        return {
            'Content-Type': CONTENT_TYPE,
            'Authorization': `bearer ${localStorage.getItem('token')}`,
        };
    }

    get client() {
        return axios.create({
            baseURL: this.baseUrl,
            headers: this.headers,
        });
    }

    postRequest(url, data) {
        // console.log('url', url)
        const options = this.getRequestOptions(POST_METHOD, url, data);

        return this.client(options)
            .then(this.onSuccess)
            .catch(this.onError);
    }

    getRequest(url, data) {
        const options = this.getRequestOptions(GET_METHOD, url, data);
        console.log('options', options)


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
        options.params = data; //  options.data = data;

        return options;
    }
}
