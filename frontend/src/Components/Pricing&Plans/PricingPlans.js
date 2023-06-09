import React, { useEffect } from 'react'
import axios from "../../Utils/axios"
import { allPricingPlans } from '../../Utils/constants'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setSubscriptions } from '../../Features/Subscriptions/SubscriptionSlice'
import { useDispatch } from 'react-redux'




const PricingPlans = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const client = useSelector(state=>state.clientAuth.client)

    const subscriptions = useSelector(state=>state.subscriptions)

    //  console.log(subscriptions);
    
   

  
   

    useEffect(()=> {

        axios.get(allPricingPlans).then((response)=>{
            // console.log(response.data)
            // setSubscriptions(response.data)
            // console.log(response.data)
            dispatch(setSubscriptions(response.data))
        })

    }, [dispatch])

   


    // useEffect(() => {
    //     console.log(subscriptions); // <== add this
    // }, [subscriptions])


    


  return (
    <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-28 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h3 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Find a Plan That's Right For You</h3>
                </div>

                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 ">
                    {/* <!-- Pricing Card --> */}
                    {subscriptions.map((subscription, key)=> { 
                        return(
                         <div key={subscription.id} className="flex flex-col p-6 mx-auto max-w-sm text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white relative ">
                            <h3 className="mb-4 text-2xl font-semibold text-[#4b7b3f]">{subscription.type}</h3>
                            <h3 className="mb-4 text-2xl font-semibold">{subscription.sessions_available} Session</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{subscription.chat_access_no_of_weeks} Week of chat access</p>
                     
                            {/* <!-- List --> */}
                            <h3 className="mb-4 text-2xl font-semibold text-[#4b7b3f] my-8">What to expect?</h3>
                            <ul className="mb-8 space-y-4 text-left ">
                                <li className="flex items-center space-x-3 ">
                                    {/* <!-- Icon --> */}
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>{subscription.details1}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    {/* <!-- Icon --> */}
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span className='w-3/4'>{subscription.details2}</span>
                                </li>
                            
                                
                            </ul>
                            <div className="flex justify-center items-baseline my-3">
                                <span className="mr-2 text-5xl font-bold"> &#x20b9;{subscription.price}</span>
                                
                            </div>
                            <button href="#" className=
                                "bg-[#9bd58b] text-[#325343] hover:bg-[#4b7b3f] hover:text-white focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-[#4b7b3f]  dark:focus:ring-primary-900 absolute -bottom-5 w-44 left-0 right-0 ms-auto me-auto"
                                onClick={()=>navigate(client ? `/order-summary/${subscription.id}`: "/login")}
                                >
                                Get started
                            </button >
                        </div>)
                    })
                   
                    }
                    
               
                   
                </div>
            
            </div>
    </section>
  )
}

export default PricingPlans