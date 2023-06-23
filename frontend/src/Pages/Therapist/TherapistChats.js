import React, { useEffect, useState, useMemo } from 'react'
import DNavbar from "../../Components/Navbar/DNavbar"
import Sidebar from '../../Components/Sidebar/Sidebar'

import TvIcon from '@mui/icons-material/Tv';
// import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EventIcon from '@mui/icons-material/Event';
import Chats from '../../Components/Chats/Chats';
import { useSelector } from 'react-redux';
import axios from '../../Utils/axios';
import { RetriveTherapySessionTherapist } from '../../Utils/constants';
import {retrieveChat} from "../../Utils/constants"





function TherapistChats() {


  const user = useSelector(state=>state.clientAuth.client)

  const therapist = useSelector(state=>state.therapistAuth.therapist)

  const  [clients, setClients] = useState([])


  const user_id = user&&user.user_id || therapist&&therapist.user_id

  // console.log(user_id)s

  const authTokensTherapist = JSON.parse(localStorage.getItem('authTokensTherapist'))
  // console.log(authTokensClient)
  const access = authTokensTherapist.access

  useEffect(() => {
    const url=`${RetriveTherapySessionTherapist}${user_id}/`
    // console.log(url)
    axios.get(url, {
      headers: { "Authorization": `Bearer ${access}` }
    })
      .then((response) => {
        // console.log(response.data) s
        setClients(response.data)
      })
      .catch((error) => console.log(error))
  }, [RetriveTherapySessionTherapist, user_id, access]);




  // useEffect(()=>{
  //   console.log(allChats)
  // },[allChats])


  // useEffect(() => {
  //   if (groupName) {
  //     console.log(groupName)
  //     axios.get(`${retrieveChat}${groupName}`, {
  //       headers: { "Authorization": `Bearer ${access}` }
  //     })
  //       .then((response) => {
  //         console.log(response.data)
  //         setAllChats(response.data)
  //       })
  //       .catch((error) => console.log(error))
  //   }
  // }, [groupName, retrieveChat, access]);



    
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
      



  return (
    <div>
        <Sidebar therapistNavLinks = {therapistNavLinks} therapistDashboard={therapistDashboard}/>
        <div className="relative md:ml-64 bg-lightBlue-600 Gray-100">
            <DNavbar therapistDashboard={therapistDashboard}/>
            {/* handleTherapistChat={handleTherapistChat} setTherapistChat={setTherapistChat} therapistChat={therapistChat} chatFromServerTherapist={chatFromServerTherapist} */}
            
            {clients&&<Chats clients={clients}/>}
        </div>
    </div>
  )
}

export default TherapistChats