
import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import axios from "../../Utils/axios"
import { ListCreateSubscriptionPlans } from '../../Utils/constants'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {RetrieveUpdateDeleteTherapist } from '../../Utils/constants' 

const DeleteTherapist = ({deleteOpen, setDeleteOpen, toBeDeleted, setTherapstTableUpdated, therapistTableUpdated }) => {
    const cancelButtonRef = useRef(null)

    const handleDeleteTherapist = (e) => {
        e.preventDefault();
        const therapistId = toBeDeleted.id
        console.log(toBeDeleted.id)

        const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
        const access = authTokensAdmin?.access;


        axios.delete(`${RetrieveUpdateDeleteTherapist}${therapistId}/`, {
            headers: { 
                "Authorization": `Bearer ${access}`
            }
        })
        .then((response)=>{
            console.log(response)
            setDeleteOpen(false)
            setTherapstTableUpdated(!therapistTableUpdated)

        })
        .catch((error)=>console.log(error))

    }

    return (
    <Transition.Root show={deleteOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setDeleteOpen(true)}>
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
                        
                            <DeleteOutlineIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        
                        </div>
                        <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left w-full">
                    
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-5">
                            You sure you want to delete ?
                            </Dialog.Title>
                            <p>Are you sure you want to delete the client <span className='text-lg font-medium'> "{toBeDeleted.name}"</span></p>
                            
                            <form onSubmit={ (e)=>handleDeleteTherapist(e)}>

                            
                            
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                    <button
                                        type="button"
                                        className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                        onClick={(e) => {
                                            setDeleteOpen(false)
                                            // setTimeout(setDeleteJournal(false), 5000)
                                            // setDeleteJournal(false)
                                            
                                            
                                            
                                            
                                        }}
                                    
                                    >
                                        Close
                                    </button>

                                    <button
                                    type="submit"
                                    className=" rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"

                                    >
                                    Delete
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
  )
}

export default DeleteTherapist