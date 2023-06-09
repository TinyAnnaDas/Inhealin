import {configureStore} from '@reduxjs/toolkit'
import clientReducer from "../Features/Client/ClientAuthSlice"
import AdminReducer from "../Features/Admin/AdminAuthSlice"
import therapistReducer from "../Features/Therapist/TherapistAuthSlice"
import updateUserReducer from "../Features/Admin/UpdateUserSlice"
import subscriptionReducer from "../Features/Subscriptions/SubscriptionSlice"



export const store = configureStore({
    reducer: {
        clientAuth:clientReducer,
        adminAuth:AdminReducer,
        updateUser: updateUserReducer,
        subscriptions:subscriptionReducer,
        therapistAuth:therapistReducer,

    }
})
