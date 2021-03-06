import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../../services/jwtService';
import { setUserData } from './userSlice';

export const submitRegister = ({ firstName,lastName,email,address,password }) => async dispatch => {
    return jwtService
        .createUser({
            firstName,
            lastName,
            address,
            password,
            email
        })
        .then(user => {
            dispatch(setUserData(user));
            return dispatch(registerSuccess());
        })
        .catch(error => {
            return dispatch(registerError(error));
        });
};

const initialState = {
    success: false,
    error: {
        username: null,
        password: null
    }
};

const registerSlice = createSlice({
    name: 'auth/register',
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.success = true;
        },
        registerError: (state, action) => {
            state.success = false;
            state.error = action.payload;
        }
    },
    extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;