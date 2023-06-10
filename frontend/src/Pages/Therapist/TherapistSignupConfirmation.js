import React from 'react'
import SignupConfirmationDetails from '../../Components/TherapistSignup/SignupConfirmationDetails';

import axios from "../../Utils/axios"
import { registerTherapist } from '../../Utils/constants';

const TherapistSignupConfirmation = ({prevStep, nextStep, handleChange, resumeFile, details}) => {

    const nextPage = (e)=> {
        e.preventDefault();
        nextStep();
    

    }
    const previousPage = (e)=>{
        e.preventDefault();
        prevStep();

    }

    const handleTherapistSignup = (e) => {

        console.log(details)
        const body = new FormData ()

        for (const key in details) {
            if (details.hasOwnProperty(key)) {
                 console.log(key)
                 console.log(details[key])


                if (key==="fluency") {
                    console.log(key)
                    details[key].forEach((obj, index) => {
                      for (const objKey in obj) {
                        if (obj.hasOwnProperty(objKey)) {
                          const fieldName = `${key}[${index}]`;
                          const value = `${objKey}-${obj[objKey]}`
                          body.append(fieldName, value);
                        }
                      }
                    });
                }else{
                    body.append(key, details[key]);
                }
             
            }
          }

        axios.post(registerTherapist, body, {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the appropriate Content-Type header
            }
          })
          .then((response)=>{
            console.log(response)
            nextPage(e)
          })
          .catch((error)=>console.log(error))

       
    }


  return (
    <div className=" relative border flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-blueGray-100 md:p-10 md:m-12">
        <div className="rounded-t bg-white mb-0 py-8 ">
            <div className=" flex justify-center">
                <h6 className="text-[#4b7b3f] text-2xl md:text-3xl font-bold">Become a Therapist on Inhealin</h6>
                
            </div>
        </div>

  
       
        <SignupConfirmationDetails details={details} resumeFile={resumeFile}/>

        <div className='flex justify-center m-6'>

            <div className='mx-3'>
                <button
                className="bg-[#4b7b3f] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-20 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={previousPage}
                >
                
                Previous
                </button>
            </div>

            <div className='mx-3'>
                <button
                className="bg-[#4b7b3f] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-20 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={handleTherapistSignup}
                >
                
                Confirm & Submit
                </button>
            </div>
 
        </div>


    </div>
  )
}

export default TherapistSignupConfirmation