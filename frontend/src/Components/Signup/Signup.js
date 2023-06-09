import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormInput from "../Form/FormInput"
import axios from "../../Utils/axios"
import { register } from "../../Utils/constants"



export default function Signup() {
    const navigate = useNavigate()
    // const [email, setEmail] = useState("")

    const [values, setValues] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
  
    })
  
    const inputs = [
      {
        id:1, 
        name:'name',
        type: 'text',
        // placeholder:"Name",
        errorMessage: "3-16 characters and shouldn't include any number or special character",
        label:"Name",
        pattern: "^[A-Za-z_ ]{3,20}",
        required:true
       
      },
      {
        id:2, 
        name:'email',
        type: 'email',
        // placeholder:"Email",
        errorMessage: "It should be a valid email address",
        label:"Email",
        required:true
      },
      {
        id:3, 
        name:'phone',
        type: 'tel',
        // placeholder:"Phone",
        errorMessage: "Phone number should contain 10 digits",
        label:"Phone",
        pattern:"[0-9]{10}",
        required:true
      },
      {
        id:4, 
        name:'password',
        type: 'password',
        // placeholder:"Password",
        errorMessage: "8-20 characters, at least 1 letter, 1 uppercase, 1 number, and 1 special character",
        label:"Password",
        pattern: `(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$`,
        required:true
      },
      {
        id:5, 
        name:'confirmPassword',
        type: 'password',
        // placeholder:"Confirm Password",
        errorMessage: "Passwords don't match",
        label:"Confirm Password",
        pattern:values.password,
        required:true
      }

    ]
    
    const onChange = (e)=>{
      setValues({...values, [e.target.name]: e.target.value})
    }
  

    const handleSignup = (e)=> {
      e.preventDefault()
      console.log(values.name)

      const body = JSON.stringify({
        
       name:values.name, 
       email:values.email,
       phone:values.phone,
       password:values.password

      })

      const notify = () =>{
        console.log("tiny")
        toast.success("Signup successful! Please log in.", {
          position: "top-center",
          autoClose: 3000,
          })
      }
      
       ;

      axios.post(register, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response)=>{
        console.log(response.status)
        if (response.status === 201){
          notify()
         
          setTimeout(() => {
            navigate("/login");
      
          }, 3000);

        }


      })

     
    }

  

    return (
      <>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src={require("../../assets/Logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 text-[#4b7b3f] hover:text-[#325343]">
              Sign up to create an account
            </h2>
            <p className=" text-center text-sm text-gray-500">
                     Already a member? 
                    <button onClick={()=>navigate("/login")} className="font-semibold leading-6 text-[#4b7b3f] hover:text-[#325343] cursor-pointer"> Sign in</button>
            </p>
      
        
          </div>
  
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={handleSignup}>
              {inputs.map((input) => (
                   <FormInput
                   key={input.id}
                   {...input}
                   value={values[input.name]} onChange={onChange}
                 />
              ))}
              
     
                <div>
                    <button
                    type="submit"
                    className="flex w-full mt-10 justify-center rounded-md bg-[#9bd58b] px-3 py-1.5 text-sm font-semibold leading-6 text-[#325343] shadow-sm hover:bg-[#4b7b3f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                    <ToastContainer autoClose={3000}/>
                  
                </div>
            </form>
       
      
          </div>
        </div>
      </>
    )
  }
  