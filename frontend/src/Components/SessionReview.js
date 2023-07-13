import React, { useRef, Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DropDown from '../Components/DropDown/DropDown'
import { useNavigate } from 'react-router-dom'
import DropDownRating from './DropDownRating'




const SessionReview = () => {
    const cancelButtonRef = useRef(null)
    const navigate = useNavigate()

    const [joined, setJoined] = useState(true)
    const [rated, setRated] = useState("")
    const [review, setReview] = useState("")

    const handleReviewSubmit = () => {
        if (!rated&&!review){
            alert("Not rated and no review")
            return 
        }else if (!rated&&review){
            alert("You have not rated")
            return 
        }else if (rated&&!review){
            alert("You have not reivewed")
            return 
        }else{

        }


    }

    // useEffect(()=> {
    //     console.log(rating)
    // }, [rating])

  return (
    <Transition.Root show={joined} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setJoined}>
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
               

                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center justify-center">
                        
                            <div className=" flex flex-col mt-3  sm:ml-4 sm:mt-0 w-full">
                                <Dialog.Title as="h3" className="text-base  font-semibold leading-6 text-gray-900">
                                   How was your experience
                                </Dialog.Title>

                                <DropDownRating setRated={setRated} rated={rated}/>

                                <div >
                                <label className="block mb-6">
                                    <span className="text-gray-700">Please leave a review...</span>
                                    <textarea
                                    value={review}
                                    onChange={(event)=>setReview(event.target.value)}
                                    name="message"
                                    className="
                                    border-teal-300
                                    focus:ring-teal-500 
                                    focus:border-teal-500
                                    focus:outline-none
                                    ring-gray-300
                                    hover:bg-gray-50
                                        p-2
                                        block
                                        w-full
                                        mt-1
                                       
                                        rounded-md
                                        shadow-sm
                                        ring-1 
                                       
                                       
                                       
                                    "
                                    rows="3"
                                    placeholder="Write here..."
                                    ></textarea>
                                </label>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                        <button
                        onClick={handleReviewSubmit}
                        type="button"
                        className=" rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        
                        
                        >
                        Submit
                        </button>
                        <button
                            type="button"
                            className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                            onClick={()=>navigate("/client/dashboard")}
                            
                        >
                            Skip
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

export default SessionReview