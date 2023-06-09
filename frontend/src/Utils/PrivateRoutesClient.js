import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRouteClient = () => {
    const user = useSelector(state=>state.clientAuth.client)
    // console.log(user)
   
    return (
            user  ? <Outlet /> : <Navigate to="/login" />
       
    )
}

export default PrivateRouteClient