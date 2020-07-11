import RegisterService from './RegisterService';

const registerService = new RegisterService();
const OK = 200;
const ERROR = 400


export const register = async (params) => {
    const isCreating = await registerService.register(params).then((payload) => {
        const status = payload.status;
        switch (status) {
            case ERROR:
                return { 'status': status, 'error': payload.data.error };
            case OK:
                return { 'status': status, 'message': payload.data.message };
        }
    }).catch((error) => {
        Promise.reject(error);
    });

    return isCreating;

}
