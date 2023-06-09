import React, { useEffect } from 'react'
import FormInput from '../Form/FormInput';

const LoginDetails = ({ nextStep, handleChange, details, values}) => {

    const nextPage = (e)=> {
        e.preventDefault();
        nextStep();
    

    }
   

  return (
    <div className="relative border flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 ">
        <div className="rounded-t bg-white mb-0 px-6 py-10 ">
            <div className=" flex justify-center">
                <h6 className="text-[#4b7b3f] text-4xl font-bold">Become a Therapist on Inhealin</h6>
                
            </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 p-3">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-name"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        className="peer block w-full rounded-md border-0 px-3 py-2  text-gray-900 shadow  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 "
                        defaultValue={details.name}
                        onChange={handleChange('name')}
                        // onBlur={()=>console.log(details.name)}
                       
                    />
                    
                    </div>
                </div>
                <div className="w-full lg:w-6/12 p-3">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="peer block w-full rounded-md border-0 px-3 py-2  text-gray-900 shadow  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 "
                        defaultValue={details.email}
                        onChange={handleChange('email')}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 p-3">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Phone
                    </label>
                    <input
                        type="tel"
                        // className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        className="peer block w-full rounded-md border-0 px-3 py-2  text-gray-900 shadow  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 "

                        defaultValue={details.phone}
                        onChange={handleChange('phone')}
                    />
                    </div>
                </div>
                <div className="w-full lg:w-6/12 p-3">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        // className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-inset focus:ring-[#9bd58b] w-full ease-linear transition-all duration-150"
                        className="peer block w-full rounded-md border-0 px-3 py-2  text-gray-900 shadow  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 "

                        defaultValue={details.password}
                        onChange={handleChange('password')}
                    />
                    </div>
                </div>
            
                </div>

             
                <form>
            
            

                <div className='flex justify-center mt-6'>
                    <button
                    className="bg-[#4b7b3f] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-20 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={nextPage}
                    >
                       
                    Next
                    </button>
                </div>
                </form>
            

      

        </div>
    </div>
  )
}

export default LoginDetails