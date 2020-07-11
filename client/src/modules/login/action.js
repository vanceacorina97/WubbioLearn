import LoginService from './LoginService';

const loginService = new LoginService();
const OK = 200;
const UNAUTHORIZED = 403


export const login = async (params) => {
    const isContecting = await loginService.login(params).then((payload) => {
        const status = payload.status;
        switch (status) {
            case UNAUTHORIZED:
                return { 'status': status, 'message': payload.data.message };
            case OK:
                localStorage.setItem('token', payload.data.token);
                return { 'status': status, 'token': payload.data.token };
        }
    }).catch((error) => {
        Promise.reject(error);
    });

    return isContecting;

}
