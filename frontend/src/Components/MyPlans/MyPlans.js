import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'


import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DropDown from '../../Components/DropDown/DropDown'
import axios from '../../Utils/axios';
import {retrieveSubscriptionClient, RetrieveUpcomingTherapySessionClient} from "../../Utils/constants"
import Calendar from '../Calendar/Calendar';

import { useNavigate } from 'react-router-dom';
import CancelTherapySession from '../CancelTherapySession/CancelTherapySession';
import ViewDetailsSubscription from '../ViewDetailsSubscription/ViewDetailsSubscription';

const MyPlans = () => {

    const [openViewDetails, setOpenViewDetails] = useState(false)
    const [cancelSessionOpen, setCancelSessionOpen] = useState(false)

    

    const [myPlan, setMyPlan] = useState("")

    const [clndr, setClndr] = useState(false)

    const [sessionData, setSessionData] = useState("")
    const [therapistData, setTherapistData] = useState("")

    const navigate = useNavigate()

    const authTokens = JSON.parse(localStorage.getItem('authTokensClient'))
    const access = authTokens.access;

    useEffect(()=>{

        axios.get(retrieveSubscriptionClient, {
            headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            // console.log(response.data)
            setMyPlan(response.data)
        })
        .catch((error)=>console.log(error))


        axios.get(RetrieveUpcomingTherapySessionClient, {
          headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
          console.log(response.data.session)
          
          const dateTimeString = response.data.session.scheduled_time;
            
            const dateTime = new Date(dateTimeString);
            // console.log(dateTimeString)

            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };
              
              const formattedDateTime = dateTime.toLocaleString("en-US", options);
              // console.log(formattedDateTime)

              const updatedSession = { ...response.data.session };
              response.data.session.scheduled_time = formattedDateTime
              updatedSession.scheduled_time = formattedDateTime;



              setSessionData(response.data.session)
              setTherapistData(response.data.therapist)


        })
        .catch((error)=> {
          console.log(error)
        })

    },[retrieveSubscriptionClient, RetrieveUpcomingTherapySessionClient])

  //   useEffect(()=>{
  //     axios.get(retrieveSubscriptionClient, {
  //         headers:{"Authorization": `Bearer ${access}`}
  //     })
  //     .then((response)=>{
  //         console.log(response.data)
  //         setMyPlan(response.data)
  //     })
  // },[retrieveSubscriptionClient]
  // )


  return (

    <div className="bg-white ">
      
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className=" mx-auto mt-10 max-w-2xl rounded-3xl ring-1 ring-gray-200  lg:mx-0 lg:flex lg:max-w-none lg:space-x-16">
              
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md ">
                  
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                        {myPlan?    
                            <div>
                                <p className="text-base font-semibold text-gray-600">Sessions available</p>
                                <p className="text-3xl font-semibold text-gray-600">{myPlan.sessions_available}</p>
                            </div>:
                            <p className="text-base font-semibold text-gray-600">No Active Plan</p>}
                            {/* <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                            </p> */}
                        
                            {/* <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> */}
                        </div>
                        <div className='flex space-x-6 m-5'>
                            {myPlan?
                             <a href="#" onClick={()=>setOpenViewDetails(true)} className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View Details</a>
                            :
                            <a onClick={()=>navigate("/pricing-and-plans")} className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Buy Now</a>
                            }
                            <a href="#" className="  mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View Old plans</a>
                        </div>

                        {openViewDetails&&<ViewDetailsSubscription openViewDetails={openViewDetails} setOpenViewDetails={setOpenViewDetails} myPlan={myPlan}/>}
                    </div>
                </div>

               


          


                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md ">
                {sessionData?
                
                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-10">
                            {sessionData.cancelled_by_therapist &&<p className="text-sm font-semibold py-5  text-red-600">Your session has been cancelled by therapist ! <br/>Please reschedule or choose a new therapist</p>}

                      
                    <div className="mx-auto max-w-xs px-8">

                        
                  
                        <p className="text-xl font-semibold text-gray-600">Upcoming Session</p>
                        <p className="text-base  text-gray-600">Therapist - {therapistData.name}</p>
                        <p className="text-base  text-gray-600">Time - {sessionData.scheduled_time} </p>




                        

                        
          
                    </div>
                    
                    <div className='flex space-x-6 m-5'>

                    {sessionData.cancelled_by_therapist?
                      <a onClick={()=> navigate(`/our-therapists/change-therapist/}`)} className="cursor-pointer  mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reschedule</a>
                      :                          
                      <a onClick={()=>{
                        setCancelSessionOpen(true)
                      }}  className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancel</a>

                    }



                      <a onClick={()=> navigate(`/our-therapists/change-therapist/${therapistData.id}`)} className="cursor-pointer  mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change Theapist</a>
                     
                    </div>

                    {cancelSessionOpen && <CancelTherapySession cancelSessionOpen={cancelSessionOpen} setCancelSessionOpen={setCancelSessionOpen} therapistName = {therapistData.name} setSessionData={setSessionData} sessionId={sessionData.id}/>}

        


                  

                 </div>
                   
                  : 

                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">

                    
                    <div className="mx-auto max-w-xs px-8">


                        
                        <p className="text-base font-semibold text-gray-600">No Upcoming Sessions</p>

                        
                        {/* <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                        </p> */}
                      
                        {/* <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> */}
                    </div>
                    <div className='flex space-x-6 m-5'>
                            <a onClick={()=> navigate("/our-therapists")} className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Book Now</a>
                    </div>

                  </div>
                 
                }   
                </div>
            </div>
        </div>
    </div>

  )
}

export default MyPlans