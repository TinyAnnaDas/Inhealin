/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// import { useState } from 'react'
// import { StarIcon } from '@heroicons/react/20/solid'
// import { RadioGroup } from '@headlessui/react'


// const reviews = { href: '#', average: 4, totalCount: 117 }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { retrieveSubscription } from '../Utils/constants';

import axios from "../Utils/axios"
import { processSubscription } from '../Utils/constants';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';



// import { useSelector } from 'react-redux';


export default function OrderSummary() {


    const { id } = useParams();

//   const subscriptions = useSelector (state=>state.subscriptions)

//   console.log(subscriptions);
    const client = useSelector(state=>state.clientAuth.client)  
   

    const navigate = useNavigate()

   const [selectedSubscription, setSelectedSubscription] = useState([])

  useEffect(()=> {

   
    axios.get(`${retrieveSubscription}${id}/`)
    .then((response)=> {
        // console.log(response);
        setSelectedSubscription(response.data)
    })
    .catch((error)=> console.log(error))

  }, [id])

//   useEffect(()=>{
//     console.log(selectedSubscription)
//   },[selectedSubscription])

// useEffect(()=>{

//     const authTokens = JSON.parse(localStorage.getItem('authTokens'))
//     const access = authTokens.access;

//     const body = {
//         paymentId: "response.razorpay_payment_id",
//         subscriptionPlanId: "id", 

//     }
//     axios.post(processSubscription, body, {
//         headers:{"Authorization": `Bearer ${access}`}
//     })
//     .then((response)=>console.log(response))

// },[])

// const notify = () =>{
//     console.log("tiny")
//     toast.success("You already have a plan purchased. Please schedule the session", {
//       position: "top-center",
//       autoClose: 3000,
//       })
//   }

  console.log(client.subscription)


  const processOrder = (id)=>{

    const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
    const access = authTokensClient.access;

    
    // if (client.subscription){

       
    //     toast.success("You already have a plan purchased. Please schedule the session. Redirecting to dashboard...", {
    //         position: "top-center",
    //         autoClose: 5000,
    //     })
          
    //     return setTimeout(() => {
    //          navigate("/client/dashboard");
      
    //       }, 5000);

    //     // alert(`Your are already subscribed to plan: ${client.subscription} Navigating to dashbaord...`)
    //     // return  navigate("/client/dashboard");
    
    // } 
   

    var options = {
        key: "rzp_test_IXDQsZH2E0OuFD",
        key_secret: "J25TCh9SuIgcRNU7u70ejE24",
        amount: selectedSubscription.price *100,
        currency:"INR",
        name: `Plan opted: ${selectedSubscription.type}`,
        handler: function(response){



            // const paymentId = response.razorpay_payment_id


            const body = {
                paymentId: response.razorpay_payment_id,
                subscriptionPlanId: id, 

            }
            axios.post(processSubscription, body, {
                headers:{"Authorization": `Bearer ${access}`}
            })
            .then((response)=>{

                navigate("/client/dashboard")
            })
            .catch((err)=>console.log(err.response.data))

           
        },
        prefill: {
            name: "Tiny Anna Das",
            email: "tinyannadas@gmail.com",
            contact: "9497289792"
        },
        notes:{
            address:"Razorpay corporate office"
        },
        theme:{
            color:"#4b7b3f"
        }

    };

    var pay = new window.Razorpay(options)
    pay.open()


  };

  return (
    <div className="bg-gradient-to-b">
        <div className="container m-auto px-4 py-12 md:px-12 lg:px-20">
            <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
                <h2 className="text-2xl text-[#4b7b3f] font-bold md:text-4xl">Order Summary</h2>
            </div>
            <div className="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
                <div className="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
                    <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
                    <div className="relative p-6 space-y-6 lg:p-8">
                        <h3 className="text-3xl text-gray-700 font-semibold text-center">Plan Opted: {selectedSubscription.type}</h3>
                        <div>
                            <div className="relative flex justify-around">
                                <div className="flex items-end">
                                    <span className="text-7xl text-gray-800 font-bold leading-0">{selectedSubscription.price}</span>
                                    <div className="pb-2">
                                        <span className="block text-xl text-[#4b7b3f] font-bold">INR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="w-max space-y-4 py-6 m-auto text-gray-600">
                        
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold text-xl">&#10003;</span>
                                <span className='text-xl'>1 Video Session</span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold text-xl">&#10003;</span>
                                <span className='text-xl'>1 Week of Chat access</span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold text-xl">&#10003;</span>
                                <span className='text-xl'>999 per Session</span>
                            </li>
                        </ul>
                        {/* <p className="flex items-center justify-center space-x-4 text-lg text-gray-600 text-center">
                            <span>Call us at</span>
                            <a href="tel:+24300" className="flex space-x-2 items-center text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>
                                <span className="font-semibold">+1 000 000</span>
                            </a>
                            <span>or</span>
                        </p> */}
                        <button onClick={()=>processOrder(id)} type="submit" title="Submit" className=" text-[#325343]  hover:text-white block w-full py-3 px-6 text-center rounded-xl transition bg-[#9bd58b]  hover:bg-[#4b7b3f] active:bg-[#4b7b3f] focus:bg-[#4b7b3f]">
                            <span className=" font-semibold">
                                Buy now
                            </span>
                        </button>
                    </div>
                </div>

                <div className="relative group md:w-6/12 lg:w-7/12">
                    <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105"></div>
                    <div className="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16">
                    <h3 className="text-3xl text-gray-700 font-semibold text-center">What to expect?</h3>
                        <ul className="space-y-4 py-6 text-gray-600">
                    
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold"> &#10003; </span>
                                <span className='text-lg'>{selectedSubscription.details1}</span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold">&#10003;</span>
                                <span className='text-lg'>{selectedSubscription.details2}</span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold">&#10003;</span>
                                <span className='text-sm'>Track your mood, maintain private journal, access unlimited wellness content.</span>
                            </li>
                            <li className="space-x-2">
                                <span className="text-[#4b7b3f] font-semibold">&#10003;</span>
                                <span className='text-sm'>Round the clock assistance to provide you a seamless experience.</span>
                            </li>
                        </ul>
                        {/* <div className="mt-6 flex justify-between gap-6">
                            <img className="w-16 lg:w-24" src="https://tailus.io/sources/blocks/organization/preview/images/clients/airbnb.svg" loading="lazy" alt="airbnb"/>
                            <img className="w-8 lg:w-16" src="https://tailus.io/sources/blocks/organization/preview/images/clients/bissell.svg" loading="lazy" alt="bissell"/>
                            <img className="w-6 lg:w-12" src="https://tailus.io/sources/blocks/organization/preview/images/clients/ge.svg" loading="lazy" alt="ge"/>
                            <img className="w-20 lg:w-28" src="https://tailus.io/sources/blocks/organization/preview/images/clients/microsoft.svg" loading="lazy" alt="microsoft"/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}
