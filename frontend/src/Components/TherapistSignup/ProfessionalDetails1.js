import React from 'react'
import FormInput from '../Form/FormInput';
import FormInputTherapist1 from '../Form/FormInputTherapist1';


const ProfessionalDetails1 = ({prevStep, nextStep, handleChange, details, handleDelete}) => {


    const nextPage = (e)=> {
        e.preventDefault();
        nextStep();
    

    }
    const previousPage = (e)=>{
        e.preventDefault();
        prevStep();

    }

  return (

       
       <div className=" relative border flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-blueGray-100 md:p-10 md:m-12">
            <div className="rounded-t bg-white mb-0 py-8 ">
                <div className=" flex justify-center">
                    <h6 className="text-[#4b7b3f] text-2xl md:text-3xl font-bold">Become a Therapist on Inhealin</h6>
                    
                </div>
            </div>
            
            
            <FormInputTherapist1 handleChange={handleChange} details={details} handleDelete={handleDelete}/>
           

            
         


    
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
                        onClick={nextPage}
                        >
                        
                        Next
                        </button>
                </div>
            </div>


            

        </div>
        
  )
}

export default ProfessionalDetails1