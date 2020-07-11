import React, { useContext } from 'react';
import { store } from '../../store/store';
import { register } from './action';
import RegisterPage from './RegisterPage';

export const RegisterContainer = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    return <RegisterPage register={register} {...props} />
}