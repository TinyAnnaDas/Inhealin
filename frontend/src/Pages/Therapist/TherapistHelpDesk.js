import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import DropDown from '../../Components/DropDown/DropDown'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import DNavbar from "../../Components/Navbar/DNavbar"
import Sidebar from '../../Components/Sidebar/Sidebar'



import TvIcon from '@mui/icons-material/Tv';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EventIcon from '@mui/icons-material/Event';

const TherapistHelpDesk = () => {

    const therapistDashboard = true

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

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
            <div className="md:py-48 py-24">
                <div className=" px-4 md:px-10 mx-auto">
                <div className="  p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                       <p className='mb-5 '>
                        <span className='text-3xl text-gray-500'>Need Help?<br/></span>
                        
                        <span className='text-sm'> We are here for you</span>
                       
                       </p>
                      
                       <button onClick={()=>setOpen(true)} type="button" className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Raise a new request</button>

                      
                       <Transition.Root show={open} as={Fragment}>
                          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                  as={Fragment}
                                  enter="ease-out duration-300"
                                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                                  leave="ease-in duration-200"
                                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                          <VolunteerActivismIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                           We are here for you
                                          </Dialog.Title>
                                          <DropDown/>
                                          <div >
                                            <label className="block mb-6">
                                              <span className="text-gray-700">What's wrong?</span>
                                              <textarea
                                                name="message"
                                                className="
                                                  block
                                                  w-full
                                                  mt-1
                                                  border-gray-300
                                                  rounded-md
                                                  shadow-sm
                                                  focus:border-indigo-300
                                                  focus:ring
                                                  focus:ring-indigo-200
                                                  focus:ring-opacity-50
                                                "
                                                rows="3"
                                                placeholder="Please describe your problem"
                                              ></textarea>
                                            </label>
     
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                      <button
                                        type="button"
                                        className=" rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                      >
                                        Submit
                                      </button>
                                      
                                    </div>
                                  </Dialog.Panel>
                                </Transition.Child>
                              </div>
                            </div>
                          </Dialog>
                      </Transition.Root>
                </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TherapistHelpDesk