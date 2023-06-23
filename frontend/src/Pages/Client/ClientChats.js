import React, { useEffect, useState, useMemo } from 'react'


import Sidebar from '../../Components/Sidebar/Sidebar'
import DNavbar from "../../Components/Navbar/DNavbar"

import TvIcon from '@mui/icons-material/Tv';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Chats from '../../Components/Chats/Chats';
import { useSelector } from 'react-redux';
import { RetriveTherapySessionClient } from '../../Utils/constants';
import axios from '../../Utils/axios';
import NoPlanChat from '../../Components/Chats/NoPlanChat';



const ClientChats = () => {

  const user = useSelector(state=>state.clientAuth.client)
  const therapist = useSelector(state=>state.therapistAuth.therapist)
  const  [therapists, setTherapists] = useState([])

  const user_id = user&&user.user_id || therapist&&therapist.user_id

  const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
  // console.log(authTokensClient)
  const access = authTokensClient.access

  // console.log(user_id)

  useEffect(()=>{
    const url = `${RetriveTherapySessionClient}${user_id}/`
    console.log(url)
    axios.get(url, {
      headers:{"Authorization": `Bearer ${access}`}
    })
    .then((response)=>{
      console.log(response.data)
      setTherapists(response.data)

    })
    .catch((error)=>console.log(error))

  },[RetriveTherapySessionClient])


   
  
  


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
            {/* handleClientChat={handleClientChat} setClientChat={setClientChat} clientChat={clientChat} chatFromServerClient={chatFromServerClient} */}
         
            {therapists?<Chats therapists={therapists}/>:<NoPlanChat/>}
        </div>
    </div>
  )
}

export default ClientChats