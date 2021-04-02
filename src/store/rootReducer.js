import { combineReducers } from '@reduxjs/toolkit';
import auth from '../auth/store/';
import users from '../Component/userTable/store'

const createReducer = asyncReducers =>
    combineReducers({
        auth,
        users,
        ...asyncReducers
    });

export default createReducer;