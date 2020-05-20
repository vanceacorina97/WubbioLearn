import Gateway from '../../utils/GatewayUtils';

class LoginGateway extends Gateway {

    login(data) {
        return this.postRequest('/users/login', data);
    }
}

export default LoginGateway;
