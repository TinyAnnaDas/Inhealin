import React, { useEffect, useState } from 'react'
import axios from "../../Utils/axios"
import DataTable from 'react-data-table-component'
import { allPricingPlans } from '../../Utils/constants'



const SubscriptionPlanTable = () => {

    const [subscriptions, setSubscriptions] = useState([])
    const [search, setSearch] = useState("")
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([])

    useEffect(()=>{
        axios.get(allPricingPlans)
        .then((response)=>{
            console.log(response.data)
            setSubscriptions(response.data)
            setFilteredSubscriptions(response.data)
        })
        .catch((error)=>console.log(error))

    }, [allPricingPlans])




    useEffect(()=>{
        const result = subscriptions.filter(subscription => {
            return subscription.type.toLowerCase().match(search.toLowerCase())
        })
        setFilteredSubscriptions(result)
    }, [search, subscriptions])


    

    const columns = [
    {
        name: "Subscription Type",
        selector: row=>row.type
    },
    {
        name: "Sessions Available",
        selector: row=>row.sessions_available
    },
    {
        name: "Chat Access",
        selector: row=>row.chat_access_no_of_weeks

    },
    {
        name: "Price",
        selector: row=>row.price
    },
    {
        name: "Edit",
        cell: row => <button type="button" class="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300">Edit the plan</button>
    },
 
    {
        name: "Delete",
        cell: row => <button type="button" class="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-red-400 hover:bg-red-500 focus:red-4 focus:ring-red-300">Delete </button>

        // cell: row => <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(row.id)} >Delete the Plan</button>
    },

    ]

    const handleDelete = () => {
        
    }

    const CustomTitle = () => <h5 className='justify-center'   >Subscription Plans</h5>;

  return (
    <DataTable 
    title = {<CustomTitle/>}
    columns={columns}
    data={filteredSubscriptions}
    pagination

    selectableRows
    selectableRowsHighlight
    highlightOnHover


    subHeader
    subHeaderComponent = {
       <input 
       id='myInput'
       type="text" 
       placeholder='Search'
       className=' text-sm rounded-lg block pl-10 p-2 bg-gray-50 border border-teal-300 text-gray-900 focus:ring-teal-500 focus:border-teal-500 focus:outline-none'
       
       value = {search}
       onChange = {(e)=> setSearch(e.target.value)}
       ></input>
    }
   
    />
  )
}

export default SubscriptionPlanTable