import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DropDown from '../../Components/DropDown/DropDown'
import axios from '../../Utils/axios';
import {retrieveSubscriptions} from "../../Utils/constants"
import Calendar from '../Calendar/Calendar';

const MyPlans = () => {

    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const [myPlan, setMyPlan] = useState("")

    const [clndr, setClndr] = useState(false)

    const authTokens = JSON.parse(localStorage.getItem('authTokensClient'))
    const access = authTokens.access;

    useEffect(()=>{
        axios.get(retrieveSubscriptions, {
            headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            console.log(response.data)
            setMyPlan(response.data)
        })
    },[])

  return (

    <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className=" mx-auto mt-10 max-w-2xl rounded-3xl ring-1 ring-gray-200  lg:mx-0 lg:flex lg:max-w-none lg:space-x-16">
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md ">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                        {myPlan?    
                            <div>
                                <p className="text-base font-semibold text-gray-600">Sessions available</p>
                                <p className="text-3xl font-semibold text-gray-600">{myPlan.sessions_available}</p>
                            </div>:
                            <p className="text-base font-semibold text-gray-600">No Active Plan</p>}
                            {/* <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                            </p> */}
                        
                            {/* <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> */}
                        </div>
                        <div className='flex space-x-6 m-5'>
                            {myPlan?
                             <a href="#" onClick={()=>setOpen(true)} className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Schedule Now</a>
                            :
                            <a href="#" className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Buy Now</a>
                            }
                            <a href="#" className="  mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View Old plans</a>
                        </div>
                    </div>
                </div>

               


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
                                 

                                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen ">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                    
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">

                                             <Calendar/>
                                        
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








                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md ">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600">No Active Plan</p>
                        {/* <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                        </p> */}
                       
                        {/* <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> */}
                    </div>
                    <div className='flex space-x-6 m-5'>
                            <a href="#" className="   mt-10 block w-full rounded-md bg-indigo-600  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default MyPlans