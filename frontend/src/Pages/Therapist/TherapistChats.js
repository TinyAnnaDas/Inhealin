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





function TherapistChats() {

  // const therapist = new WebSocket('ws://127.0.0.1:8000/ws/ac/')

//   const  groupName = "test-group"
//  const therapist = useMemo(() => new WebSocket('ws://127.0.0.1:8000/ws/ajwc/' + groupName+'/'), []);

//   const [therapistChat, setTherapistChat] = useState("")

//   const [chatFromServerTherapist, setChatFromServerTherapist] = useState("")


//   const handleTherapistChat = ()=> {
   

//     therapist.send(JSON.stringify({
//       "msg" : therapistChat
//     }))

//     setTherapistChat("")

//   }


  
  // useEffect(()=>{
   
  //   // console.log(chat)

  //   therapist.onopen = ()=> {

  //     console.log("Web Socket is Connected...")
  //     // therapist.send("Hi from therapist")
  //   }

  //   therapist.onmessage = (event)=> {
  //     console.log("Message received from server...", event.data)

  //     const data = JSON.parse(event.data)

  //     console.log(data.message)
  //     // const data = JSON.parse(event.data) //String to JS object.
  //     // document.querySelector('#chat-log').value += (data.msg + '\n')
  //     setChatFromServerTherapist(data.message)
      
  //   }

  //   therapist.onclose = ()=>{
  //     console.log("Chat socket closed unexpectedly...")
  //   }

  //   // return () => {
  //   //   therapist.close();
  //   // };

    

  // },[therapist])

    
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
            
            <Chats />

        </div>
    </div>
  )
}

export default TherapistChats