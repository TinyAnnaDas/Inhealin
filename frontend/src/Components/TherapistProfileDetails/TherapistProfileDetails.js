import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../Utils/axios'
import { retrieveTherapistAdditionalDetails } from '../../Utils/constants'

const TherapistProfileDetails = () => {

    const [therapistBasicInfo, setTherapistBasicInfo] = useState("")
    const [therapistAdditionalDetails, setTherapistAdditionalDetails] = useState("")

    const therapist = useSelector(state=>state.therapistAuth.therapist)


    useEffect(()=>{
        axios.get(`${retrieveTherapistAdditionalDetails}${therapist.user_id}`)
    .then((response)=>{
        console.log(response.data.additional_details)
        setTherapistBasicInfo(response.data.therapist)
        setTherapistAdditionalDetails(response.data.additional_details)
    })
    .catch((error)=> console.log(error))

    }, [retrieveTherapistAdditionalDetails])


    const inputs = [
        {
          id:1,
          name:"age",
          label:"How old are you ?",
          values: Array.from({ length: 65 - 18 + 1 }, (_, index) => index + 18)
         
        },
        {
          id:2,
          name:"gender",
          label:"What is your gender ?",
          values: ["Male","Female", "Non-Binary", "Transgender", "Intersex", "Neutral", "I prefer not to say", "Others",]
    
        },
        {
          id:3,
          name:"qualification",
          label:"What is your most relevant qualification for this job ?",
          values: ["Bachelors in Pyschology","Masters in Psychology", "PHD in Psychology"]
        },
        {
          id:4,
          name:"experience",
          label:"How much actual counselling work experience do you have ?",
          values: ["0 year","Less than a year", "1-3 years", "3-6 years", "6-10 years", "10-15 years", "More than 15 years"]
        },
        {
          id:5,
          name:"hoursPerWeek",
          label:"How many hours can you commit to counselling on Felicity per week ?",
          values: ["Less than 9 hours","9-18 hours", "18-27 hours", "27-36 hours", "36-45 hours"]
        },
        {
          id:6,
          name:"specialization",
          label:"Are there any specific areas that you specialise in ?",
          values: ["Anxiety","Stress", "Depression", "Relationship Issues", "Adolescent Issues"]
        },
        {
          id:7,
          name:"technique",
          label:"What therapy techniques are you experienced in ?",
          values: ["Cognitive Behavioral Therapy","Client Centered", "Existential"]
        },
       
        
      ]

    




 
  return (
    <div className="relative border flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
        <div className="rounded-t bg-white mb-0 px-6 py-6 ">
            <div className=" flex justify-center">
                <h6 className="text-[#4b7b3f] text-xl font-bold">My account</h6>
                
            </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Your Basic Information
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue= {therapistBasicInfo.name}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={therapistBasicInfo.email}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={therapistBasicInfo.phone}
                    />
                    </div>
                </div>
            
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Additional Details
                </h6>
                <div className="flex flex-wrap">
                    {inputs.map((input)=>{
                      
                        return(
                        <div className="w-full lg:w-12/12 px-4 mb-4">
                           <div className="relative w-full mb-3">
                           <label
                               className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                               htmlFor="grid-password"
                           >
                               {input.name}
                           </label>
                           <input onChange={()=>{
                                

                           }}
                               type="text"
                               className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                               defaultValue="depression"
                           />
                           </div>
                       </div>
                       )



                    })}
                    {/* <div className="w-full lg:w-12/12 px-4 mb-4">
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Age
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="depression"
                        />
                        </div>
                    </div> */}

                    {/* <div className="w-full lg:w-12/12 px-4  mb-4">
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Gender
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="English"
                        />
                        </div>
                    </div>


                    <div className="w-full lg:w-12/12 px-4  mb-4">
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Do you have a gender preference for your therapist?
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Female"
                        />
                        </div>
                    </div>

                    <div className="w-full lg:w-12/12 px-4  mb-4">
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            When do you want to schedule your first session?
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="3pm - 7pm"
                        />
                        </div>
                    </div>


                    <div className="w-full lg:w-12/12 px-4  mb-4">
                        <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            What is your preferred time for a session?
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="3 pm - 7 pm"
                        />
                        </div>
                    </div> */}


                </div>

                <div className='flex justify-center'>
                    <button
                    className="bg-[#4b7b3f] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-20 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    >
                    Save
                    </button>
                </div>
                </form>
            

                <hr className="mt-6 border-b-1" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Delete Your Account
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="flex  justify-center ">
                            <h6 className='text-xl  '>Deleting account will remove all your personal information. 
                            <br /><span className='uppercase'>This action cannot be undone.</span> </h6>
                        </div>
                        <div className='flex  justify-center mt-5'>
                                <button
                                className="bg-[#f44d4d] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-20 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                                >
                                Delete
                                </button>
                            </div>
                    </div>
                </div>

        </div>
    </div>
  )
}

export default TherapistProfileDetails