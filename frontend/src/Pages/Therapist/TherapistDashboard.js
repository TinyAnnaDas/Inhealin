import React from 'react'
import DNavbar from "../../Components/Navbar/DNavbar"
import Sidebar from '../../Components/Sidebar/Sidebar'



import TvIcon from '@mui/icons-material/Tv';
// import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EventIcon from '@mui/icons-material/Event';
import WelcomeBlock from '../../Components/Headers/WelcomeBlock';




const TherapistDashboard = () => {


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
      <WelcomeBlock/>
      
    </div>
  </div>
  )
}

export default TherapistDashboard