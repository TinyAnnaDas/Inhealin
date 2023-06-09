import React from 'react'
import { useSelector } from 'react-redux'

const WelcomeBlock = () => {
    const client = useSelector(state=>state.clientAuth.client)
    const therapist = useSelector(state=>state.therapistAuth.therapist)
    console.log(therapist)

  return (
    <div>
  
       <div className="relative bg-lightBlue-600 md:pt-28 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
            <div className=" w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
              <div className=' justify-center'> 
                <p className="mb-2 text-3xl text-gray-500 dark:text-gray-400">Welcome to InhealIn,</p>

                {client&&<p className="mb-5 text-3xl font-bold text-gray-900 ">{client.name} </p>}

                {therapist&&<p className="mb-5 text-3xl font-bold text-gray-900 ">{therapist.name} </p>}
              </div>

                
                <p>“Who looks outside, dreams; who looks inside, awakes”  -- Carl Jung</p>
              
          
            </div>
          
        </div>
      </div>
    </div>
   
   


  )
}

export default WelcomeBlock