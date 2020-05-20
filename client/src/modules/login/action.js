import LoginService from './LoginService';
import { history } from '../../utils/history';

const loginService = new LoginService();

export const login = async (params) => {
    const token = await loginService.login(params);
    if (token) {
        localStorage.setItem('token', token.data.token);
        history.push('/');

    }


}
