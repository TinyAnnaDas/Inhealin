import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Nabar'

const HowItWorks = () => {
  return (
    <div>
        <Navbar/>

        <div className="flex flex-wrap justify-center pt-32">
              <div className="w-fit px-4">

                <div className="relative border flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
                  <div className="rounded-t bg-white mb-0 px-6 py-6 ">
                      <div className=" flex justify-center">
                          <h6 className="text-[#4b7b3f] text-4xl font-bold">How it Works</h6>
                          
                      </div>
                  </div>
                  <div className="flex-auto flex justify-center px-4 lg:px-10 py-10 pt-0">

                    <ol className="items-center ">
                        <li className="relative mb-6 ">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white bg-[#325343] sm:ring-8 shrink-0">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                </div>
                               
                            </div>
                            <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                            </div>
                        </li>
                        <li className="relative mb-6 ">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6  rounded-full ring-0 ring-white bg-[#325343] sm:ring-8  shrink-0">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                </div>
                             
                            </div>
                            <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.2.0</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                            </div>
                        </li>
                        <li className="relative mb-6 ">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white bg-[#325343] sm:ring-8  shrink-0">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                </div>
                               
                            </div>
                            <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.3.0</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                            </div>
                        </li>
                      
                    </ol>
                
                  </div>
            
                  
                </div>
              </div>
        </div>

        <Footer/>
    </div>
  )
}

export default HowItWorks