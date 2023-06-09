import { createSlice } from "@reduxjs/toolkit";

import jwtDecode from 'jwt-decode';


const initialState = {
    authTokenClient: localStorage.getItem('authTokensClient')? JSON.parse(localStorage.getItem('authTokensClient')):null,
    client: localStorage.getItem('authTokensClient')? jwtDecode(localStorage.getItem('authTokensClient')):null,
    
}


const ClientAuthSlice = createSlice({
    name : 'clientAuth',
    initialState, 
    reducers:{
        loginClient: (state, action) => {
            state.authTokenClient = action.payload.authTokenClient 
            state.client = action.payload.client
        },
        
        logoutClient:(state)=>{
            state.authTokenClient = null
            state.client = null
            localStorage.removeItem('authTokensClient')

        }

    }

})

export const {loginClient, logoutClient} = ClientAuthSlice.actions

export default ClientAuthSlice.reducer