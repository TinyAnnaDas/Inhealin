import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from "../../Utils/axios"
import { useNavigate, useParams } from 'react-router-dom'



import { allApprovedTherapists, gettherapistAdditionalDetails, ListCreateTherapySession,retrieveSubscriptionClient } from '../../Utils/constants'

const ListTherapist = () => {

    // const [therapists, setTherapists] = useState([])

    const [therapistDetails, setTherapistDetails] = useState([])
    const [userPlan, setUserPlan] = useState("")
    
    const {therapistId} = useParams()
    // console.log(therapistId)

    const client = useSelector(state=>state.clientAuth.client)

    const navigate = useNavigate()

    const authTokensClient = JSON.parse(localStorage.getItem('authTokensClient'))
    const access = authTokensClient?.access
    

    // useEffect(() => {


    //       axios.get(allApprovedTherapists)
    //       .then((response) => {
    //         // console.log(response.data);
    //         const filteredData = response.data.filter(obj => obj.id !== parseInt(therapistId));
    //         console.log(filteredData);
            
    //         therapistId? setTherapists(filteredData):  setTherapists(response.data);
           
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });

       
    //   }, [allApprovedTherapists]);
   

      useEffect(() => {
        axios.get(gettherapistAdditionalDetails)
          .then((response) => {
            // console.log(response.data);

            for (let i=0; response.data.length >i; i++){
              console.log(response.data[i].next_available)

              const dateTimeString = response.data[i].next_available;
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


              response.data[i].next_available=formattedDateTime
            }

            const filteredData = response.data.filter(obj => obj.therapist !== parseInt(therapistId) );
            // console.log(filteredData);
            therapistId? setTherapistDetails(filteredData):  setTherapistDetails(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

          if(client){

            axios.get(retrieveSubscriptionClient,{
              headers:{"Authorization": `Bearer ${access}`}
            })
            .then((response)=>{
              // console.log(response.data)
              setUserPlan(response.data)
            })
            .catch((error)=>console.log(error))

          }
          


         

      }, [gettherapistAdditionalDetails, retrieveSubscriptionClient]);


      // useEffect(() => {
      //   const updatedTherapistDetails = therapistDetails.map((therapist) => {
      //     const matchingTherapist = therapists.find((item) => item.id === therapist.therapist);
      //     if (matchingTherapist) {
      //       return { ...therapist, name: matchingTherapist.name };
      //     }
      //     return therapist;
      //   });
      //   setTherapistDetails(updatedTherapistDetails);
      // }, [therapists]);

      // useEffect(()=>{
      //   console.log(therapistDetails)
      // }, [therapistDetails])

      
   const bookASession = (therapistId, therapistName) => {

   

      

        // console.log(userPlan)
      if (userPlan && client) {
        navigate(`/our-therapists/book-a-session/${therapistId}/${therapistName}`)
        
      }else if (!client) {
        navigate("/login")
      }
      else {
        navigate("/pricing-and-plans")
      }

    


   }





  return (
    <div className=' grid justify-items-center grid-cols-1  md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 m-5 gap-5'>
        
        {therapistDetails.map((therapist, index)=>{

         
            return(
           
                <div key={index}  className=" w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow">

                    <div className="flex justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
                            <span className="sr-only">Open dropdown</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                        </button>

                        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                            </li>
                            <li>
                                <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export Data</a>
                            </li>
                            <li>
                                <a href="/#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie "/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{therapist.therapist_name}</h5>
                        <span className="mb-3 text-sm text-gray-500">{therapist.qualification}</span>
                        <p className='className="m-1 text-sm font-medium text-gray-900"'>Next Available at - {therapist.next_available} </p>
                        <div className="flex mt-4 space-x-10 md:mt-6">
                            <a href="/#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  ">View Profile</a>
                            <a  onClick={()=>bookASession(therapist.therapist, therapist.therapist_name)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  cursor-pointer">Book a session</a>
                        </div>
                    </div>

                </div>
            )
           
         })} 
         


    </div>
    

  )
}

export default ListTherapist