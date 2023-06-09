import { createSlice } from "@reduxjs/toolkit";

import jwtDecode from 'jwt-decode';


const initialState = {
    authToken: localStorage.getItem('authTokensTherapist')? JSON.parse(localStorage.getItem('authTokensTherapist')):null,
    therapist: localStorage.getItem('authTokensTherapist')? jwtDecode(localStorage.getItem('authTokensTherapist')):null,
    
}


const TherapistAuthSlice = createSlice({
    name : 'therapistAuth',
    initialState, 
    reducers:{
        loginTherapist: (state, action) => {
            state.authTokensTherapist = action.payload.authTokensTherapist 
            state.therapist = action.payload.therapist
        },
        
        logoutTherapist:(state)=>{
            state.authTokensTherapist = null
            state.therapist = null
            localStorage.removeItem('authTokensTherapist')

        }

    }

})

export const {loginTherapist, logoutTherapist} = TherapistAuthSlice.actions

export default TherapistAuthSlice.reducer