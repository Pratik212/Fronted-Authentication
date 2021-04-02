import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import Login from "../Component/loginCard/Login";
import Dashboard from "../Component/home/Dashboard";
import Registration from "../Component/registrationCard/Registration";

// const routeConfigs = [LoginConfig, ...appsConfigs];

const routes = [
    {
        path: '/login',
        exact: true,
        component: () => (
            <Route
                path="/login"
                render={() => {
                    return <Login />;
                }}
            />
        )
    },
    {
        component: () => <Redirect to="/404" />
    }
];

export function DashboardAuth() {
    return <Redirect to="/" />;
}

export default routes;