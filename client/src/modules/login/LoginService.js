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
                return error;
            })
    }
}

export default LoginService;