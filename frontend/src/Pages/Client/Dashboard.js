import React from 'react'
import WelcomeBlock from '../../Components/Headers/WelcomeBlock'
import DNavbar from "../../Components/Navbar/DNavbar"
import Sidebar from '../../Components/Sidebar/Sidebar'



import TvIcon from '@mui/icons-material/Tv';
// import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MyPlans from '../../Components/MyPlans/MyPlans';


const Dashboard = () => {

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
          <DNavbar clientDashboard={clientDashboard} />
          <WelcomeBlock/>
          <MyPlans/>
        </div>
       
        
    </div>
  )
}

export default Dashboard