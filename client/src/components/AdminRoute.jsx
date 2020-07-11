import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtDecode from 'jwt-decode';

const AdminRoute = ({ component: Component, ...rest }) => {


    const isAdminAuthenticate = () => {
        const token = JwtDecode(localStorage.getItem('token'));
        if (token.data.type === 'admin')
            return true;
        return false;
    }

    return (
        <Route {...rest} render={(props) => (
            isAdminAuthenticate ? <Component {...props} /> : <Redirect to='/' />
        )} />)
}

export default AdminRoute;

