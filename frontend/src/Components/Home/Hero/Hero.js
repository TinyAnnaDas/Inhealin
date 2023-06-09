// import { useState } from 'react'
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useNavigate } from "react-router-dom"

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
// ]

export default function Hero(props) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  console.log(props)
  const navigate = useNavigate()

  const {client, therapist} = props

  return (

    <section className="bg-[#325343] dark:bg-[#325343]">
      {client&&
      <div className="grid max-w-screen-xl px-20 py-24 mx-auto lg:gap-20 xl:gap-24 lg:py-24 lg:grid-cols-12">
          <div className=" place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none sm:text-4xl xl:text-5xl text-white">You deserve to be happy</h1>
              <p className="max-w-2xl mb-6 font-lightlg:mb-8 md:text-lg lg:text-xl text-white">Online Counselling Therapy With Top Psychologists Anytime, <br/>Anywhere, Any device.</p>
              <a href="/#" className="bg-[#9bd58b] text-[#325343] hover:bg-[#4b7b3f] hover:text-white inline-flex items-center justify-center px-5 py-3 mr-3  font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  Get started
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>

          </div>
          <div className=" hidden lg:mt-0 lg:col-span-5 lg:flex w-full">
              <img  src={require("../../../assets/hero-img.png")} alt="mockup"/>
          </div>                
      </div>
      }


      {therapist&&
      <div className="grid max-w-screen-xl px-20 py-24 mx-auto lg:gap-20 xl:gap-24 lg:py-24 lg:grid-cols-12">
          <div className=" place-self-center  md:col-span-5 ">
            <div className="flex flex-col items-center lg:block">
              <p className="sm:text-center lg:text-start max-w-2xl mb-6 font-lightlg:mb-8 text-4xl md:text-4xl text-white ">GROW your counselling practice from the comfort of your home at ZERO OPERATING COST</p>
                <button onClick={()=>navigate('/therapist/get-onboard/questions')} className="bg-[#9bd58b] text-[#325343] hover:bg-[#4b7b3f] hover:text-white inline-flex items-center justify-center px-5 py-3 m-3  font-medium text-center rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Apply Now
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              <p className="mt-3 text-white">Already have an account? <span onClick={()=>navigate("/therapist-login")} className="text-[#9bd58b] text-lg cursor-pointer">Login</span></p>
            </div>
          </div>
          <div className=" hidden lg:mt-0 lg:col-span-7 lg:flex w-full">
              <img  src={require("../../../assets/helping_hand.png")} alt="mockup"/>
          </div>                
      </div>
      }

      
    </section>

      
  
  )
}
