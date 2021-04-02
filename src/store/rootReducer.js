import { combineReducers } from '@reduxjs/toolkit';
import auth from '../auth/store/';

const createReducer = asyncReducers =>
    combineReducers({
        auth,
        ...asyncReducers
    });

export default createReducer;