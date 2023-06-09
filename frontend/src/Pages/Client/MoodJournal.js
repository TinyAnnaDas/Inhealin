import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {v4 as uuidv4} from "uuid"


// import DropDown from '../../Components/DropDown/DropDown'

import SpaIcon from '@mui/icons-material/Spa';

import Sidebar from '../../Components/Sidebar/Sidebar'
import DNavbar from "../../Components/Navbar/DNavbar"

import TvIcon from '@mui/icons-material/Tv';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from '../../Utils/axios';
import { processJournalData } from '../../Utils/constants';



const MoodJournal = () => {


    const clientDashboard = true
    

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('');

    const [editJournal, setEditJournal] = useState("")
    const [editJournalId, setEditJournalId] = useState("")
    const [deleteJournal, setDeleteJournal] = useState(null)

    const [journals, setJournals] = useState([])

    const cancelButtonRef = useRef(null)

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

    const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
    // console.log(authTokensClient)
    const access = authTokensClient.access

    const handleJournal = ()=>{

            const journal = message 
            const date = new Date();

        const body = {
            "journal_data": journal,
            "created_at":date

        }

        axios.post(processJournalData, body, {
            headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            console.log(response.data)
            setMessage("")
           
        })
        .catch((error)=>console.log(error))
        
    }



    useEffect(()=>{
        axios.get(processJournalData, {
            headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            // console.log(response.data)
            setJournals(response.data)
        })
        .catch((error)=> console.log(error) )

    }, [access, message, deleteJournal])


    const handleDelete = (deleteJournal)=>{
        // console.log(deleteJournal)
        const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
        // console.log(authTokensClient)
        const access = authTokensClient.access
        // console.log(access)

        axios.delete(`${processJournalData}?delete_journal=${deleteJournal}`,{
            headers:{"Authorization": `Bearer ${access}`}
         
        })
        .then((response) => {
            if (response.status ===200){
                setDeleteJournal("")
            }
        });

    }

    const handleEdit = ()=> {
        // console.log("tiny")

        if (editJournal.journalData === message){
            setEditJournal("")
            setMessage("")
            return 
        }
        // console.log(editJournal.journalData)
       
        // console.log(editJournal.journalId)

        const body = {
            "journal_id": editJournal.journalId,
            "journal_data":editJournal.journalData

        }
        axios.put(processJournalData, body, {
            headers:{"Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            // console.log(response)
            setEditJournal("")
            setMessage("")
        })

    }



  return (
    <div>
        <Sidebar clientNavLinks = {clientNavLinks} clientDashboard={clientDashboard}/>
            <div className="relative md:ml-64 bg-lightBlue-600 Gray-100">
            <DNavbar clientDashboard={clientDashboard}/>

            <div className='overflow-x-hidden'>
                <div className="md:pt-28 pt-12">
                    <div className="px-4 md:px-10 mx-auto ">
                    <div className=" p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                            <p className='mb-5'>Write you thoughts</p>
                            
                            <button onClick={()=>setOpen(true)} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create a new Journal <ControlPointIcon className='ms-3'/></button>


                             
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
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                                                {deleteJournal? 
                                                <DeleteOutlineIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                :
                                                <SpaIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
                                            
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                           
                                    
                                            {deleteJournal ? 
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Are you sure?
                                            </Dialog.Title>
                                            :
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Add your thoughts
                                            </Dialog.Title>}
                                          
                                            {deleteJournal?
                                            <p>Are you sure you want to delete the journal?</p>
                                            :
                                            <div >
                                                <label className="block m-6">
                                              
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
                                                    placeholder="Type here..."
                                                    
                                                    defaultValue={editJournal.journalData}
                                                    onChange={(e)=>{
                                                        editJournal?
                                                        setEditJournal({...editJournal, journalData:e.target.value})
                                                        :
                                                        setMessage(e.target.value)
                                                    }}
                                                ></textarea>
                                                </label>
        
                                            </div>}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                        <button
                                            type="button"
                                            className=" rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => {
                                                setOpen(false)
                                                // setTimeout(setDeleteJournal(false), 5000)
                                                // setDeleteJournal(false)
                                                deleteJournal&&
                                                setTimeout(() => {
                                                    setDeleteJournal(false);
                                                  }, 500);

                                                editJournal&&
                                                setTimeout(() => {
                                                    setEditJournal("");
                                                  }, 500);
                                                
                                                
                                                
                                                
                                            }}
                                           
                                        >
                                            Close
                                        </button>

                                        {deleteJournal?
                                            <button
                                            type="button"
                                            className=" rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => {
                                                setOpen(false)
                                                handleDelete(deleteJournal)
                                            }}
                                             
                                            >
                                              Delete
                                          </button>
                                          :

                                          <button
                                            type="button"
                                            className=" rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            
                                            disabled={!message}
                                            onClick={(e) => {

                                                setOpen(false)
                                                // console.log("tiny")
                                                editJournal.journalData ? 
                                                handleEdit()
                                                :
                                                handleJournal()


                                            }}
                                           
                                        >
                                            Submit
                                        </button>

                                        }
                                         
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


                <div className="mx-auto container py-20 px-6">
                    <div className="grid justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                        {journals.map((journal)=>{
                            // {console.log(journal)}
                            return(
                            <div key={uuidv4()} className="w-full h-64 flex flex-col justify-between items-start bg-blue-300 rounded-lg border border-blue-300 mb-6 py-5 px-4">
                                <div>
                                    <h4 className="text-gray-800 font-bold mb-3 text-sm">{journal.updated_at}</h4>
                                    <p className="text-gray-800 text-sm">{journal.journal}</p>
                                </div>
                                <div className="w-full flex flex-col items-start">
                           
                                    <div className="flex items-center justify-between text-gray-800 w-full">
                                      
                                        <button onClick={()=>{
                                            setOpen(true)
                                            setEditJournal({ "journalId":journal.id, "journalData":journal.journal })
                                            setMessage(journal.journal)

                                            }}
                                         className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black" aria-label="edit note" role="button">
                                            <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="15" height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                            </svg>
                                        </button>

                                        <button
                                            onClick={(e)=>{
                                                
                                                setDeleteJournal(journal.id)
                                                // console.log(e.currentTarget.dataset.value)
                                                setOpen(true)
                                            }}
                                            className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black"
                                            aria-label="delete note"
                                            role="button"
                                            // data-value={deleteJournal}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 1024 1024">
                                                <path fill="currentColor" d="m896.8 159.024l-225.277.001V71.761c0-40.528-33.008-72.496-73.536-72.496H426.003c-40.528 0-73.52 31.968-73.52 72.496v87.264h-225.28c-17.665 0-32 14.336-32 32s14.335 32 32 32h44.015l74.24 739.92c3.104 34.624 32.608 61.776 67.136 61.776h398.8c34.528 0 64-27.152 67.088-61.472l74.303-740.24h44.016c17.68 0 32-14.336 32-32s-14.32-31.985-32-31.985zM416.482 71.762c0-5.232 4.271-9.505 9.52-9.505h171.984c5.248 0 9.536 4.273 9.536 9.505v87.264h-191.04zm298.288 885.44c-.16 1.777-2.256 3.536-3.376 3.536h-398.8c-1.12 0-3.232-1.744-3.425-3.84l-73.632-733.856H788.45z"/>
                                            </svg>
                                        </button>
                                    
                                    </div>
                                </div>
                            </div>)

                        })}
                
 
                
                    
                    
                    </div>
                </div>
            </div>

           
            
        </div>
    </div>
  )
}

export default MoodJournal