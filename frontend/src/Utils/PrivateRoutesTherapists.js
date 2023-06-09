import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRouteTherapist = () => {
    const therapist = useSelector(state=>state.therapistAuth.therapist)

   
    return (
        therapist  ? <Outlet /> : <Navigate to="/therapist/get-onboard" />
       
    )
}

export default PrivateRouteTherapist