import React, { useContext } from 'react';
import { store } from '../../store/store';
import { login } from './action';
import LoginPage from './LoginPage';

export const LoginContainer = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    return <LoginPage login={login} {...props} />
}