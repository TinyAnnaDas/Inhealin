import { Fragment, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import DoneIcon from '@mui/icons-material/Done';

const SignupSuccess = ({details}) => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const cancelButtonRef = useRef(null)

  return (
    <div>
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
                                           
                                            <div className="mt-3 flex flex-col  place-items-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                           
                                    
                                            <DoneIcon style={{ fontSize: '3rem' }}  className='m-5 text-green-600 '/>
                                              <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                                Your Application Has been Submitted
                                              </Dialog.Title>
                                              
                                            
                                              
                                              <p className='text-center p-3'>Please check your email to know the status of your application.</p>
                                         
                                            </div>
                                        </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                                 

                                   

                                          <button
                                            type="button"
                                            className=" rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"

                                            onClick={(e) => {

                                                setOpen(false)
                                                navigate("/therapist/get-onboard")

                                            }}
                                           
                                          >
                                            Ok
                                        </button>

                                      
                                         
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

export default SignupSuccess