import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    authTokensAdmin: localStorage.getItem('authTokensAdmin')? JSON.parse(localStorage.getItem('authTokensAdmin')): null, 
    
    admin: localStorage.getItem('authTokensAdmin')? jwtDecode (localStorage.getItem('authTokensAdmin')): null, 
}

const adminAuthSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers: {
        loginAdmin: (state, action) => {
            state.adminAuthToken = action.payload.authTokensAdmin;
            state.admin = action.payload.admin
          },

        logoutAdmin:(state) => {
            state.authTokensAdmin = null
            state.admin = null
            localStorage.removeItem('authTokensAdmin')
        }
    }
});


export const { loginAdmin, logoutAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;