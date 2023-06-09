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



const ClientChats = () => {

    // const  groupName = "test-group"

    // const client = useMemo(() => new WebSocket('ws://127.0.0.1:8000/ws/ajwc/' + groupName+'/'), []);

    // const [clientChat, setClientChat] = useState("")

    // const [chatFromServerClient, setChatFromServerClient] = useState("")

    // const handleClientChat = ()=> {
   

    //   client.send(JSON.stringify({
    //     "msg" : clientChat
    //   }))
  
    //   setClientChat("")
  
    // }


    // useEffect(()=>{
   
    //   // console.log(chat)
  
    //   client.onopen = ()=> {
  
    //     console.log("Web Socket is Connected...")
    //     // therapist.send("Hi from therapist")
    //   }
  
    //   client.onmessage = (event)=> {
    //     console.log("Message received from server...", event.data)
  
    //     const data = JSON.parse(event.data)
  
    //     console.log(data.message)
    //     // const data = JSON.parse(event.data) //String to JS object.
    //     // document.querySelector('#chat-log').value += (data.msg + '\n')
    //     setChatFromServerClient(data.message)
        
    //   }
  
    //   client.onclose = ()=>{
    //     console.log("Chat socket closed unexpectedly...")
    //   }
  
    //   // return () => {
    //   //   therapist.close();
    //   // };
  
      
  
    // },[client])
  


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
         
            <Chats/> 
        </div>
    </div>
  )
}

export default ClientChats