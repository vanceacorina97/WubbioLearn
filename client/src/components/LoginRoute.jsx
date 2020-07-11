import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtDecode from 'jwt-decode';

const LoginRoute = ({ component: Component, ...rest }) => {

    const token = localStorage.getItem('token');

    const isAuthenticated = () => {
        let currentToken = JwtDecode(token);
        let currentDate = Date.now();
        if (currentDate >= currentToken) {
            localStorage.setItem('token', '');
            return false;
        }
        return true;
    }

    return (
        <Route {...rest} render={(props) => (
            token && isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
        )} />)
}

export default LoginRoute;

