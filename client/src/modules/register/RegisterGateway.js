import Gateway from '../../utils/GatewayUtils';

class RegisterGateway extends Gateway {

    register(data) {
        return this.postRequest('/users/register', data);
    }
}

export default RegisterGateway;