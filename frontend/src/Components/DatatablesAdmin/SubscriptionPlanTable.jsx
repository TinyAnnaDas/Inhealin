import React, { useEffect, useState } from 'react'
import axios from "../../Utils/axios"
import DataTable from 'react-data-table-component'
import { ListCreateSubscriptionPlans } from '../../Utils/constants'
import CreateSubscription from '../SubscriptionManagement/CreateSubscription'
import EditSubscription from '../SubscriptionManagement/EditSubscription'
import DeleteSubscription from '../SubscriptionManagement/DeleteSubscription'



const SubscriptionPlanTable = () => {

    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const [toBeEdited, setToBeEdited] = useState("")
    const [toBeDeleted, setToBeDeleted] = useState("")


     useEffect(()=> {
        console.log(toBeEdited)
    },[toBeEdited])

    
    const [subscriptionUpdated, setSubscriptionUpdated] = useState(false)
    // const [subscriptionEdited, setSubscriptionEdited] = useState(false)

    


    const [subscriptions, setSubscriptions] = useState([])
    const [search, setSearch] = useState("")
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([])


    const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
    const access = authTokensAdmin?.access;


    useEffect(()=>{
        axios.get(ListCreateSubscriptionPlans, {
            headers: { "Authorization": `Bearer ${access}`}
        })
        .then((response)=>{
            console.log(response.data)
            setSubscriptions(response.data)
            setFilteredSubscriptions(response.data)
        })
        .catch((error)=>console.log(error))

    }, [subscriptionUpdated])




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
        selector: row=>row.price,
        sortable:true,
        sortField: "rice"
        
    },
    {
        name: "Edit",
        cell: row => <>
            <button  onClick={()=>{
                setEditOpen(true) 
                setToBeEdited(row)}} 
                    type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300">Edit the plan</button>
                {toBeEdited&& <EditSubscription editOpen={editOpen} setEditOpen={setEditOpen} toBeEdited={toBeEdited} setSubscriptionUpdated={setSubscriptionUpdated} subscriptionUpdated={subscriptionUpdated}/>}
        </>
        
    },
 
    {
        name: "Delete",
        cell: row => 
        <>
        <button  onClick={()=>{
            setDeleteOpen(true)
            setToBeDeleted(row)
            }} type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-red-400 hover:bg-red-500 focus:red-4 focus:ring-red-300">Delete </button>
        {toBeDeleted&& <DeleteSubscription deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} toBeDeleted={toBeDeleted} setSubscriptionUpdated={setSubscriptionUpdated} subscriptionUpdated={subscriptionUpdated}/>}
        </>

        // cell: row => <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(row.id)} >Delete the Plan</button>
    },

    ]

    const handleDelete = () => {
        
    }

    const CustomTitle = () => <h5 style={{ textAlign: "right"}}  >Subscription Plans</h5>;

  return (
    <>
    <DataTable 
    title = {<CustomTitle/>}
    columns={columns}
    data={filteredSubscriptions}
    pagination

    selectableRows
    selectableRowsHighlight
    highlightOnHover

    defaultSortField={filteredSubscriptions.price}
    defaultSortAsc={true}

    actions={
        <>
        <button onClick={()=>setOpen(true)}  type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-green-400 hover:bg-green-500 focus:red-4 focus:ring-green-300">+ Add Subscription </button>
        <CreateSubscription open={open} setOpen={setOpen} setSubscriptionUpdated={setSubscriptionUpdated} subscriptionUpdated={subscriptionUpdated}/>
        </>
      }


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

    </>
  )
}

export default SubscriptionPlanTable