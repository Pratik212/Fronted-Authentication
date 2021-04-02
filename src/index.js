import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContext from './AppContext';
import Routes from './routes'
import {Provider} from "react-redux";
import routes from './fuse-configs/routesConfig';
import store from './store';
import {Router} from "react-router";
import Auth from "./auth/Auth";
import history from './@history/@history'

ReactDOM.render(
    <AppContext.Provider
        value={{
            routes
        }}
    >
        <Provider store={store}>
            <Auth>
                <Router history={history}>
                    <Routes />
                </Router>
            </Auth>
        </Provider>
    </AppContext.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
