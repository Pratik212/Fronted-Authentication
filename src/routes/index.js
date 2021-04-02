import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../Component/loginCard/Login';
import Registration from '../Component/registrationCard/Registration';
import Dashboard from "../Component/home/Dashboard";
import UserTable from "../Component/userTable/userTable";


export default function Routes() {
    const getAccessToken = () => {
        return localStorage.getItem('jwt_access_token');
    };
    console.log('getAccessToken:::::::::', getAccessToken());
    console.log('Route:::::::::', Route);

    if (getAccessToken()) {
        return (
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/register" exact component={Registration} />
                <Route path="/login" exact component={Login} />
                <Route path="/user" exact component={UserTable} />

                <Route component={Dashboard} />
            </Switch>
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/register" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/user" exact component={UserTable} />

            <Route component={Dashboard} />
        </Switch>
        </BrowserRouter>
    );
}