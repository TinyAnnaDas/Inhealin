import React, { useEffect, useState } from 'react'

import Sidebar from '../../Components/Sidebar/Sidebar'
import DNavbar from "../../Components/Navbar/DNavbar"

import TvIcon from '@mui/icons-material/Tv';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import VideoRoom from '../../Components/VideoRoom';

import axios from '../../Utils/axios';
import {RetrieveUpcomingTherapySessionClient} from "../../Utils/constants"

const ClientSessions = () => {

  const [joined, setJoined] = useState(false)


  const [sessionData, setSessionData] = useState("")
  const [therapistData, setTherapistData] = useState("")

  const authTokens = JSON.parse(localStorage.getItem('authTokensClient'))
  const access = authTokens.access;

  

  useEffect(()=>{
    axios.get(RetrieveUpcomingTherapySessionClient, {
      headers:{"Authorization": `Bearer ${access}`}
    })
    .then((response)=>{
      console.log(response.data)
      
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


  }, [])


    const clientDashboard = true

    const clientNavLinks = [
    {
      text: 'Dashboard',
      path: '/client/dashboard',
      icon: <TvIcon />
    }, 
    {
      text: 'Profile',
      path: "/client/profile",
      icon: <AccountCircleOutlinedIcon/>
    }, 
    {
      text: 'Sessions',
      path: "/client/sessions",
      icon: <OndemandVideoOutlinedIcon />
    },
    {
      text: 'My Chats',
      path: "/client/my-chats",
      icon: <ChatBubbleOutlineOutlinedIcon />
    },
    {
      text: 'Mood Journal',
      path: "/client/mood-journal",
      icon: <NoteAltOutlinedIcon />
    },
    {
      text: 'Help Desk',
      path: "/client/help-desk",
      icon: <HelpOutlineOutlinedIcon />
    },
    ]

  return (
    <div>
        <Sidebar clientNavLinks = {clientNavLinks} clientDashboard={clientDashboard}/>
        <div className="relative md:ml-64 bg-lightBlue-600 Gray-100">
            <DNavbar clientDashboard={clientDashboard}/>

            <div className="relative bg-lightBlue-600 md:pt-28  pt-12 align-middle">

              <div className="flex flex-col px-10 align-middle mt-24">

                  <div className='flex flex-row justify-center'>
                    <div className="flex items-center mr-4">
                        <input id="inline-2-radio" type="radio"  name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2  "/>
                        <label htmlFor="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900 ">Upcoming Sessions</label>
                    </div>
                    <div className="flex items-center mr-4">
                        <input  id="inline-checked-radio" type="radio"  name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
                        <label htmlFor="inline-checked-radio" className="ml-2 text-sm font-medium text-gray-900 ">Completed Sessions</label>
                    </div>
                  </div>

                  <div className='flex justify-center mt-10'>
                    <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                        <div className="flex justify-center p-5">
                            Upcoming Video Session
                          
                          
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3  " src={require("../../assets/chat-icon.png")} alt="Bonnie image"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 ">{therapistData.name}</h5>
                            <p>Session Id - {sessionData.id}</p>
                            <span className="text-sm text-gray-500 ">Scheduled Time - {sessionData.scheduled_time}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  ">Cancel Session</a>

                              {!joined && 
                                 <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 " onClick={()=>setJoined(true)}>Join Session</a>

                              }
                              

                            </div>
                        </div>
                    </div>
                  </div>




              </div>

              
            </div>
            
        </div>

        {joined &&
                              <VideoRoom joined={joined} setJoined = {setJoined} sessionId= {sessionData.id}/>
                              }

    </div>

    
  )
}

export default ClientSessions