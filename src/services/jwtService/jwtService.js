import axios from 'axios';
import jwtDecode from 'jwt-decode';
import psl from 'psl';
import { AddRoleToUserObj } from '../../auth/authRoles';
import constants from '../../fuse-configs/Constants';
import FuseUtils from '../../utils/FuseUtils';
/* eslint-disable camelcase */

let domain = 'localhost';
if (process.env.REACT_APP_STAGE === 'prod' || process.env.REACT_APP_STAGE === 'staging') {
    domain = psl.parse(window.location.hostname).domain;
}

class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.request.use(config => {
            config.baseURL = constants.API_URL;
            return config;
        });

        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        this.setSession(null);
                    }
                    if (err.response.status === 500 && err.config && !err.config.__isRetryRequest) {
                        this.emit('serverError', 'Server Error, Please try again.');
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();
        if (!access_token) {
            this.emit('onNoAccessToken');

            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = data => {
        return new Promise((resolve, reject) => {
            axios.post('/Admin/register', data).then(response => {
                if (response.data.user) {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                } else {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithEmailAndPassword = (email,password) => {
        return new Promise((resolve, reject) => {
            axios
                .post('/Admin/login', {
                    email,
                    password
                })
                .then(response => {
                    if (response.data) {
                        this.setSession(response.data.token);
                        resolve(response.data);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    generateOtpOfUser = (phoneNumber, role) => {
        return new Promise((resolve, reject) => {
            axios
                .post('/Auth/otp', {
                    phoneNumber,
                    role
                })
                .then(response => {
                    if (response.data.data) {
                        resolve(response.data.data);
                    } else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios
                .post('/Admin/ValidateToken', {
                    token: this.getAccessToken()
                })
                .then(response => {
                    if (response.data.token) {
                        this.setSession(response.data.token);
                        resolve(AddRoleToUserObj(response.data));
                    } else {
                        this.logout();
                        Promise.reject(new Error('Failed to login with token.'));
                    }
                })
                .catch(error => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });
    };

    updateUserData = user => {
        return axios.post('/api/auth/user/update', {
            user
        });
    };

    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            // localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem('jwt_access_token');
            // localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new JwtService();

export default instance;