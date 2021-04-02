import { combineReducers } from '@reduxjs/toolkit';
import getAllUser from './userSlice';

const reducer = combineReducers({
    user: getAllUser,
});

export default reducer;