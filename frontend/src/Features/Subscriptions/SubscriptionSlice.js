import { createSlice } from "@reduxjs/toolkit";



const SubscriptionSlice = createSlice({
    name:"subscriptions", 
    initialState: [],
    reducers: {
        setSubscriptions: (state, action)=> {
            return action.payload
        }
    }

})

export const {setSubscriptions} = SubscriptionSlice.actions

export default SubscriptionSlice.reducer