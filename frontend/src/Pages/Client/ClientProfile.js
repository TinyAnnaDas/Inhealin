import React from 'react'

import Sidebar from '../../Components/Sidebar/Sidebar'
import DNavbar from "../../Components/Navbar/DNavbar"
import ClientProfileDetails from "../../Components/ClientProfileDetails/ClientProfileDetails"


import TvIcon from '@mui/icons-material/Tv';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const ClientProfile = () => {

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

            <div className="relative bg-lightBlue-600 md:pt-28 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                <div className=" w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        Client Profile

                </div>
                </div>
            </div>
           
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <ClientProfileDetails/>
              </div>
            </div>


          
            
        </div>

    </div>
  )
}

export default ClientProfile