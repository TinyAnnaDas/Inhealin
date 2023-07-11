import React, { useEffect, useState } from 'react'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

import axios from "../../Utils/axios"
import { retrieveTherapySessionsTherapist } from '../../Utils/constants';
import { Card } from '@mui/material';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


import { cancelTherapySessionTherapist } from '../../Utils/constants';




const UpcomingSessionsOverview = () => {

    const cancelButtonRef = useRef(null)
    // const slides = [
    //     {
    //       url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    //     },
    //     {
    //       url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    //     },
    //     {
    //       url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    //     },
    
    //     {
    //       url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    //     },
    //     {
    //       url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    //     },
    //   ];
    

    const [sessionData, setSessionData] = useState([])
    let [cancelOpen, setCancelOpen] = useState(false)

    const authTokensTherapist = JSON.parse(localStorage.getItem('authTokensTherapist'))
    const access = authTokensTherapist.access

    


    useEffect(()=> {

        axios.get(retrieveTherapySessionsTherapist, {
            headers: { "Authorization": `Bearer ${access}` }
        })
        .then((response)=> {
            console.log(response.data)
            
            const formattedData = response.data.map((item)=> {
                const dateTimeString = item.scheduled_time;

                const dateTime = new Date(dateTimeString);
                const options = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  };

                const formattedDateTime = dateTime.toLocaleString("en-US", options);

                return { ...item, scheduled_time: formattedDateTime };


            })
            setSessionData(formattedData)

            
        })
        .catch((error)=> console.log(error))

    }, [retrieveTherapySessionsTherapist])
    


const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sessionData?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sessionData?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleCancelSessionTherapist = (e, id) => {
    e.preventDefault()
    console.log(id)
    const body = new FormData()
    body.append("cancelled_by_therapist", "true")



    axios.put(`${cancelTherapySessionTherapist}${id}/`, body, {
        headers: { 
            "Authorization": `Bearer ${access}`
        }
    })
    .then((response)=>{
        console.log(response)
        setCancelOpen(false)
        setSessionData([])

    })
    .catch((error)=> console.log(error))

    

  }
    
  return (
    <div>
        <p className="mb-2 text-2xl text-gray-500 dark:text-gray-400 text-center pt-5 font-medium">Upcoming Sessions</p>

        {/* <p className='text-center text-lg pt-5 '>Upcoming Sessions</p> */}
        {/* <Card/> */}

        <div className='max-w-lg  w-full m-auto  px-4 relative group'>
          
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="p-4 max-w-md">
                    {sessionData.length > 0 ?
                        (<div className="flex rounded-lg h-full bg-[#f7f0e6] p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-[#4a4d4a] text-white flex-shrink-0">
                                    <PersonalVideoIcon/>
                                </div>
                                
                            </div>

                            <div className="flex flex-col justify-between flex-grow">
                            <h2 className="text-black text-lg font-medium">Session Id - {sessionData[currentIndex].id}</h2>
                                <p className="leading-relaxed text-base text-black">
                                    Client - {sessionData[currentIndex].client_name}
                                  </p>
                                  <p className="leading-relaxed text-base text-black">
                                    Scheduled Time - {sessionData[currentIndex].scheduled_time}
                                  </p>
                                  <div className='m-5 flex justify-center'>
                                    <button onClick={()=>setCancelOpen(true)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none   font-medium rounded-lg text-xs px-5 py-2 text-center mr-2 ">Cancel the Session</button>
                                  
                                    </div>
                                 
                                {/* <a href="#" class="mt-3 text-black hover:text-blue-600 inline-flex items-center">Learn More
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a> */}
                            </div>
                        </div>):
                        (
                            <p>No Scheduled Sessions by Client Yet...</p>
                          )}

                    </div>
                </div>

           
       
            {/* <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
            >
                 
                
            </div> */}
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {sessionData.map((data, slideIndex) => (
                <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className='text-2xl cursor-pointer'
                >
                    <RxDotFilled />
            </div>
                ))}
        </div>  
        </div>


        <Transition.Root show={cancelOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setCancelOpen(true)}>
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
                                You sure you want to cancel ?
                                </Dialog.Title>
                                <p>Are you sure you want to cancel the session with the client <span className='text-lg font-medium'> { sessionData.length > 0 &&sessionData[currentIndex].client_name}</span></p>
                                
                                <form onSubmit={ (e)=>handleCancelSessionTherapist(e, sessionData[currentIndex].id)}>

                                
                                
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                        <button
                                            type="button"
                                            className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => {
                                                setCancelOpen(false)
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
  

        




    </div>
  )
}

export default UpcomingSessionsOverview