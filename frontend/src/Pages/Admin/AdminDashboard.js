import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'


// import  MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import TvIcon from '@mui/icons-material/Tv';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import DNavbar from '../../Components/Navbar/DNavbar';




const AdminDashboard = () => {


  const adminDashboard = true

  const adminNavLinkHeaders = {
      clientManagement: "Client Management",
      therapistMangement: "Therapist Mangement",
      inhealinAdminPanel: "Inhealin Admin Panel"
  }


  const therapistNavLinksAdmin = [

    {
      text: 'Therapists',
      path: "/admin/therapist-management",
      icon: <PeopleOutlineIcon/>
    }, 

  ]

  const clientNavLinksAdmin = [
    {
      text: 'Dashboard',
      path: '/admin/dashboard',
      icon: <TvIcon />
    }, 
    {
      text: 'Clients',
      path: "/admin/client-management",
      icon: <PeopleOutlineIcon/>
    }, 
    {
      text: 'Subscriptions',
      path: "/admin/subscription-management",
      icon: <SubscriptionsOutlinedIcon />
    },
 
    

  ]
  
  return (
    <div >
        <Sidebar adminNavLinkHeaders={adminNavLinkHeaders} clientNavLinksAdmin = {clientNavLinksAdmin} therapistNavLinksAdmin = {therapistNavLinksAdmin} adminDashboard={adminDashboard}/>
        <div className="relative md:ml-64 bg-lightBlue-600 Gray-100">
          <DNavbar adminDashboard={adminDashboard}/>
          <div className="relative bg-lightBlue-600 md:pt-28 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
              <div className=" w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                    Administration Dashboard
          
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard