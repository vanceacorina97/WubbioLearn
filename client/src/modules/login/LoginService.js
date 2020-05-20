import LoginGateway from './LoginGateway';

class LoginService {

    constructor() {
        this.gateway = new LoginGateway();
    }

    login(data) {
        return this.gateway.login(data)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                Promise.reject(error);
            })
    }
}

export default LoginService;