import React from "react";
import {logoutClient} from '../../Features/Client/ClientAuthSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutAdmin } from "../../Features/Admin/AdminAuthSlice";
import { logoutTherapist } from "../../Features/Therapist/TherapistAuthSlice";



const ClientLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const therapist = useSelector(state=>state.therapistAuth.therapist)

  const client = useSelector(state=>state.clientAuth.client)

  const admin = useSelector(state=>state.adminAuth.admin)


  const handleLogout = ()=> {
    if (admin){
      dispatch(logoutAdmin())
      navigate("/admin")

    }else if (client){

      dispatch(logoutClient())
      navigate("/")

    }else if (therapist){

      dispatch(logoutTherapist())
      navigate("/therapist/get-onboard")

    }

  }
 
  
  return (
    <>
      <div className="items-center flex">
     
       
        <span className="w-10 h-10  text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <button 
            type="button" 
            className="text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-12 mb-2 inline-flex"
            onClick={()=>handleLogout()}
            >
              Logout
              <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </span>
      </div>

    </>
  );
};

export default ClientLogout;
