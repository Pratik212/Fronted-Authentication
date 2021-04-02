import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '../../../utils/FuseUtils';
import { showMessage } from '../../../store/fuse/messageSlice'

export const getAllUser = createAsyncThunk('authentication/user/getAllUser', async  dispatch  => {
    try {
        const response = await axios.get('Admin/user');
        console.log('GetAllUser response;:::::', response.data);
        return response.data;
    } catch (err) {
        dispatch(showMessage({ message: FuseUtils.getErrorMessageFromResponse(err) }));
    }
});

const userSlice = createSlice({
    name: 'authentication/user/getAllUser',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getAllUser.fulfilled]: (state, action) => action.payload
    }
});

export default userSlice.reducer;