

import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import axios from "../../Utils/axios"
import { RetrieveUpdateDeleteSubscriptionPlans } from '../../Utils/constants'

import SpaIcon from '@mui/icons-material/Spa';

const EditSubscription = ({editOpen, setEditOpen, subscriptionUpdated, setSubscriptionUpdated, toBeEdited}) => {
    
    const cancelButtonRef = useRef(null)
    // useEffect(()=> {
    //     console.log(toBeEdited)
    // },[toBeEdited])

   console.log(toBeEdited.type)

    const handleCreateSubscription = (e) => {
        e.preventDefault();
        const subscriptionId = toBeEdited.id

        const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
        const access = authTokensAdmin?.access;

        const body = new FormData()
        body.append('type', e.target.type.value)
        body.append('sessions_available', e.target.sessionsAvailable.value)
        body.append('chat_access_no_of_weeks', e.target.chatAccess.value)
        body.append('price', e.target.price.value)
        body.append('details1', e.target.details1.value)
        body.append('details2', e.target.details2.value)
        

        axios.put(`${RetrieveUpdateDeleteSubscriptionPlans}${subscriptionId}/`, body, {
            headers: { 
                "Authorization": `Bearer ${access}`, 
                "Content-Type" : 'multipart/form-data'
            }
            
        })
        .then((response)=> {
            console.log(response)

            setEditOpen(false)
            setSubscriptionUpdated(!subscriptionUpdated)

        })
        .catch((error)=>console.log(error))


    }
   

  return (
    <>
    
    <Transition.Root show={editOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setEditOpen(true)}>
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"  onClick={(e) => e.stopPropagation()}/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto" >
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 p-6 ">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                        
                            <SpaIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        
                        </div>
                        <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left w-full">
                    
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-5">
                                Edit Subscription
                            </Dialog.Title>
                            
                            <form onSubmit={ (e)=>handleCreateSubscription(e)}>

                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input defaultValue={toBeEdited.type} type="text"  name="type" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                        <label htmlFor="floating_type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input defaultValue={toBeEdited.sessions_available} type="text" name="sessionsAvailable" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                        <label htmlFor="sessions_available" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sessions Available</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input defaultValue={toBeEdited.chat_access_no_of_weeks}  type="text" name="chatAccess"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                        <label htmlFor="chat_access" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Chat Access (in weeks)</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input defaultValue={toBeEdited.price}  type="text" name="price"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                        <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                                    </div>
                                </div>
                            
                                <div className="relative z-0 w-full mb-6 group">
                                    <input defaultValue={toBeEdited.details1}  type="text" name="details1"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                    <label htmlFor="details1" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details 1</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input defaultValue={toBeEdited.details1} type="text" name="details2"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                    <label htmlFor="details2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details 2</label>
                                </div>
                            
                            
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                    <button
                                        type="button"
                                        className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                        onClick={(e) => {
                                            setEditOpen(false)
                                            // setTimeout(setDeleteJournal(false), 5000)
                                            // setDeleteJournal(false)
                                            
                                            
                                            
                                            
                                        }}
                                    
                                    >
                                        Close
                                    </button>

                                    <button
                                    type="submit"
                                    className=" rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"

                                    >
                                    Update
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                    </div>
                
                </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
    </Transition.Root>
    </>
  )
}

export default EditSubscription