import { useNavigate } from "react-router-dom"
import axios from '../../Utils/axios';
import {login} from '../../Utils/constants'
import { loginClient } from "../../Features/Client/ClientAuthSlice";
import {useDispatch} from "react-redux"
import jwtDecode from 'jwt-decode';

import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = (e)=>{
      e.preventDefault();
      const body = JSON.stringify({
        'email': e.target.email.value,
        'password': e.target.password.value,
      });


      const notify = () =>{
        // console.log("tiny")
        toast.success("Login successful! Redirecting to dashbaord...", {
          position: "top-center",
          autoClose: 3000,
          })
      }
     

      axios
      .post(login, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response)=>{

        if (response.status === 200){
          console.log(response)
          notify()

            setTimeout(() => {
              localStorage.setItem('authTokensClient', JSON.stringify(response.data))
              dispatch(loginClient({authTokenClient: JSON.stringify(response.data), client: jwtDecode(response.data.access) }))
    
        
            }, 3000); 
            //Here I am not redirecting anywhere because I have set the public route like that logged in user automatically get to see the dashboard

        }
      })
      .catch((error)=> {
        console.log(error.response.data.detail)
        error = error.response.data.detail
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          })
        
      })
    }

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-white">
          <body className="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src={require("../../assets/Logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 text-[#4b7b3f] hover:text-[#325343]">
              Sign in to your account
            </h2>
            <p  className="font-semibold text-center text-[#4b7b3f] hover:text-[#325343]">
                Talk . Resolve. Heal
            </p>
        
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 focus:outline-none p-2"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#9bd58b] sm:text-sm sm:leading-6 focus:outline-none p-2"
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
                    <button onClick={()=>navigate("/signup")} className="font-semibold leading-6 text-[#4b7b3f] hover:text-[#325343] cursor-pointer ml-1"> Sign up</button>
            </p>
      
          </div>
          <ToastContainer autoClose={3000}/>
        </div>
     
      </>
    )
  }
  