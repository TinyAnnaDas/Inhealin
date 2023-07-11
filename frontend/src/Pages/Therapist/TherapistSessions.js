import React, { useEffect, useState } from 'react'
import DNavbar from "../../Components/Navbar/DNavbar"
import Sidebar from '../../Components/Sidebar/Sidebar'


import TvIcon from '@mui/icons-material/Tv';
// import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EventIcon from '@mui/icons-material/Event';
import axios from '../../Utils/axios';
import { RetrieveUpcomingTherapySessionTherapist } from '../../Utils/constants';
import VideoRoom from '../../Components/VideoRoom';

const TherapistSessions = () => {

  const [joined, setJoined] = useState(false)

  const [sessionData, setSessionData] = useState("")
  const [clientData, setClientData] = useState("")

    const therapistDashboard = true

   

    const therapistNavLinks = [
        {
          text: 'Dashboard',
          path: '/therapist/dashboard',
          icon: <TvIcon />
        }, 
        {
          text: 'Profile',
          path: "/therapist/profile",
          icon: <AccountCircleOutlinedIcon/>
        }, 
        {
          text: 'Sessions',
          path: "/therapist/sessions",
          icon: <OndemandVideoOutlinedIcon />
        },
        {
          text: 'My Chats',
          path: "/therapist/my-chats",
          icon: <ChatBubbleOutlineOutlinedIcon />
        },
        {
          text: 'Manage Calendar',
          path: "/therapist/manage-calendar",
          icon: <EventIcon />
        },
        {
          text: 'Help Desk',
          path: "/therapist/help-desk",
          icon: <HelpOutlineOutlinedIcon />
        },
      ]


      const authTokensTherapist = JSON.parse(localStorage.getItem('authTokensTherapist'))
      const access = authTokensTherapist.access
  
  
      useEffect(()=> {
  
        axios.get(RetrieveUpcomingTherapySessionTherapist, {
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
              setClientData(response.data.therapist)
    
    
        })
        .catch((error)=> {
          console.log(error)
        })
  
      }, [])
      


  return (
    <div>
        <Sidebar therapistNavLinks = {therapistNavLinks} therapistDashboard={therapistDashboard}/>
        <div className="relative md:ml-64 bg-lightBlue-600 Gray-100">
            <DNavbar therapistDashboard={therapistDashboard}/>

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
                            <h5 className="mb-1 text-xl font-medium text-gray-900 ">{clientData.name}</h5>
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

export default TherapistSessions