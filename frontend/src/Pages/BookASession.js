import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import FilterTherapist from '../Components/Filter/FilterTherapist'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Nabar'

import axios from "../Utils/axios"
import { ToastContainer, toast } from 'react-toastify';

import { ListCreateTherapySession, retrieveTherapistAdditionalDetails, UpdateTherapySession, RetrieveUpcomingTherapySessionClient} from '../Utils/constants'
import {format} from 'date-fns'


const BookASession = () => {

    const {therapistId} = useParams();

    const {therapistName} = useParams()
    console.log(therapistId)
    console.log(therapistName)

    const [therapistDetails, setTherapistDetails] = useState([])
    const [sessionData, setSessionData] = useState("")
    let [availability, setAvailability] = useState("")

    const client = useSelector(state=>state.clientAuth.client)
    console.log(client.therapy_session)
    const navigate = useNavigate()

    const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
    const access = authTokensClient.access


    useEffect(()=>{
      axios.get(RetrieveUpcomingTherapySessionClient, {
        headers:{"Authorization": `Bearer ${access}`}
      })
      .then((response)=>{
        console.log(response.data)
        setSessionData(response.data.session)
       


      })
      .catch((error)=> {
        console.log(error)
      })
    }, [RetrieveUpcomingTherapySessionClient])

    const therapySessionExists = () => {
      
    }

    useEffect(()=>{
        axios.get(`${retrieveTherapistAdditionalDetails}${therapistId}`)
        .then((response)=>{
            console.log(response)
            setTherapistDetails(response.data.additional_details)

            if (response.data.availability){
              const dateTimeString = response.data.availability;
              const dateTime = new Date(dateTimeString);

              const options = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
              };
            
              const formattedDateTime = dateTime.toLocaleString("en-US", options);
              console.log(formattedDateTime)

               setAvailability(formattedDateTime)
            }

           



            // const formattedAvailableDay = format(response.data.availability, 'yyyy-MM-dd')
            // console.log(formattedAvailableDay)
            
        })
        .catch((error)=>console.log(error))

    },[retrieveTherapistAdditionalDetails, therapistId])


    const notifyChnageTherapist = () =>{
      // console.log("tiny")
      toast.success("Therapist Changed Successfully. Redirecting to dashbaord...", {
        position: "top-center",
        autoClose: 3000,
        })
    }

    const notifyBookedTherapist = ()=> {
      toast.success("Therapist Booked Successfully. Redirecting to dashbaord...", {
        position: "top-center",
        autoClose: 3000,
        })
    }
    

    const handleBookASession = () => {

        // therapistId = parseInt(therapistId, 10);
        // console.log(client.user_id)
        // console.log(therapistId)

        const dateString = availability
        const inputDate = new Date(dateString);

        const year = inputDate.getFullYear().toString().padStart(4, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDate.getDate().toString().padStart(2, '0');
        const hours = inputDate.getHours().toString().padStart(2, '0');
        const minutes = inputDate.getMinutes().toString().padStart(2, '0');
        const seconds = inputDate.getSeconds().toString().padStart(2, '0');
        const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        console.log(formattedDateString)



        if (sessionData){

          const body = new FormData()
          body.append('therapist', therapistId)
          body.append('scheduled_time', formattedDateString)
          
          const sessionId = sessionData.id
          axios.put(`${UpdateTherapySession}${sessionId}/`, body, {
            headers: { 
              "Authorization": `Bearer ${access}`,
              "Content-Type" : 'multipart/form-data'
          }})
          .then((response)=> {
            console.log(response.data)
            notifyChnageTherapist()
            setTimeout(() => {
              navigate("/client/dashboard")
              
            }, 3000); 

          })
          .catch((error)=>console.log(error))
          
        }else{

          const body = new FormData()
          body.append('therapist',  therapistId)
          body.append('client', client.user_id)
          body.append('scheduled_time', formattedDateString)
          

          axios.post(ListCreateTherapySession, body, {
            headers: { 
              "Authorization": `Bearer ${access}`, 
              "Content-Type" : 'multipart/form-data'
          }
          })
          .then((response)=>{
            console.log(response.data)
            notifyBookedTherapist()
            setTimeout(() => {
              navigate("/client/dashboard")
              
            }, 3000); 

          })
          .catch((error)=> console.log(error))

        }

    
       

    }


    useEffect(()=>{
      console.log(sessionData)
    },[sessionData])

  return (
    <div> 
        <Navbar/>
        
        <div className="flex flex-wrap justify-center pt-32">
              <div className="w-fit px-4">

                <div className="relative border flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
                  <div className="rounded-t bg-white mb-0 px-6 py-6 ">
                      <div className=" flex justify-center">
                          <h6 className="text-[#4b7b3f] text-4xl font-bold">Book a Session</h6>
                          
                      </div>
                  </div>
                  <div className="flex-auto flex justify-center px-4 lg:px-10 py-10 pt-0">

                    <ol className="items-center ">
                       
                        <li className="relative mb-6 ">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6  rounded-full ring-0 ring-white bg-[#325343] sm:ring-8  shrink-0">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipule="evenodd"></path></svg>
                                </div>
                             
                            </div>
                            <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg font-semibold text-gray-900 ">{therapistName}</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{therapistDetails.qualification}</time>


                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"><span className='font-bold'>Specialization</span> {therapistDetails.specialization}</p>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"><span className='font-bold'>Languages Spoken</span> {therapistDetails.fluency}</p>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"><span className='font-bold'>Therapeutic Expertise</span> {therapistDetails.technique}</p>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"><span className='font-bold'>Next Available at </span>{availability}</p>
                                <div className='flex justify-center mt-5'>
                                <a onClick={()=>handleBookASession()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  cursor-pointer">Confirm your session</a>

                                </div>




                            </div>
                        </li>
                 
                      
                    </ol>
                
                  </div>
            
                  
                </div>
              </div>
        </div>

        <Footer/>
        <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default BookASession