import React from 'react'
import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Utils/axios';
import {login} from '../../Utils/constants'
import { loginTherapist } from '../../Features/Therapist/TherapistAuthSlice';
import {useDispatch} from "react-redux"
import jwtDecode from 'jwt-decode';


const TherapistLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleTherapistLogin = (e)=>{
        e.preventDefault();
        const body = JSON.stringify({
          'email': e.target.email.value,
          'password': e.target.password.value,
        });

        axios
        .post(login, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response)=>{

            if (response.status === 200){
                console.log(response.data)
                localStorage.setItem('authTokensTherapist', JSON.stringify(response.data))
                dispatch(loginTherapist({authTokensTherapist: JSON.stringify(response.data), therapist: jwtDecode(response.data.access) }))
                navigate("/therapist/dashboard");
      
              }
            
        })

       
    }

  return (
    <div>     
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-20 w-auto"
                src={require("../../assets/Logo.png")}
                alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 text-[#4b7b3f] hover:text-[#325343]">
               Help us make the world happier.
            </h2>
            <p  className="font-semibold text-center text-[#4b7b3f] hover:text-[#325343]">
               Apply Now
            </p>
        
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleTherapistLogin}>
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="text-sm">
                    <a href="/" className="font-semibold text-[#4b7b3f] hover:text-[#325343]">
                        Forgot password?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#9bd58b] px-3 py-1.5 text-sm font-semibold leading-6 text-[#325343] shadow-sm hover:bg-[#4b7b3f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member? 
                    <button className="font-semibold leading-6 text-[#4b7b3f] hover:text-[#325343] cursor-pointer"> Sign up</button>
            </p>

            </div>
        </div>
    </div>
  )
}

export default TherapistLogin