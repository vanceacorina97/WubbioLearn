import RegisterGateway from './RegisterGateway';

class RegisterService {

    constructor() {
        this.gateway = new RegisterGateway();
    }

    register(data) {
        return this.gateway.register(data)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            })
    }
}

export default RegisterService;