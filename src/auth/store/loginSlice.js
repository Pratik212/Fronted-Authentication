import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../../services/jwtService/jwtService';
import { setUserData } from './userSlice';

export const generateOtp = ({ phoneNumber, role }) => async dispatch => {
    return jwtService
        .generateOtpOfUser(phoneNumber, role)
        .then(user => {
            // dispatch(setUserData(user));

            return dispatch(loginSuccess());
        })
        .catch(error => {
            return dispatch(loginError(error));
        });
};

export const submitLogin = ({ email, password }) => async dispatch => {
    return jwtService
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(setUserData(user));

            return dispatch(loginSuccess());
        })
        .catch(error => {
            return dispatch(loginError(error));
        });
};

const initialState = {
    success: false,
    error: {
        email: null,
        password: null

    }
};

const loginSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.success = true;
        },
        loginError: (state, action) => {
            state.success = false;
            state.error = action.payload;
        }
    },
    extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;