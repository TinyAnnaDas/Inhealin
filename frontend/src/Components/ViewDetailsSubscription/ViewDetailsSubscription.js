import { Dialog, Transition } from '@headlessui/react'

import { Fragment, useRef, useState } from 'react'

const ViewDetailsSubscription = ({openViewDetails, setOpenViewDetails, myPlan}) => {

    const cancelButtonRef = useRef(null)

  
  return (
    <Transition.Root show={openViewDetails} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenViewDetails}>
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
            

            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  ">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
            
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">

                <div  className="flex flex-col p-6 mx-auto max-w-sm text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white relative ">
                    <h3 className="mb-4 text-2xl font-semibold text-[#4b7b3f]">{myPlan.type} Plan</h3>
                    <h3 className="mb-4 text-2xl font-semibold">Avilable Sessions - {myPlan.sessions_available}</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400"> Week of chat access - {myPlan.chat_access_no_of_weeks}</p>
            
                    {/* <!-- List --> */}
                    <h3 className="mb-4 text-2xl font-semibold text-[#4b7b3f] my-8">Amount Paid</h3>
                 
                    <div className="flex justify-center items-baseline ">
                        <span className="mr-2 text-5xl font-bold"> &#x20b9;999</span>
                        
                    </div>
            
                </div>
                
                </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button
                type="button"
                className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                onClick={() => setOpenViewDetails(false)}
                >
                Close
                </button>
                
            </div>
            </Dialog.Panel>
                
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition.Root>
  )
}

export default ViewDetailsSubscription