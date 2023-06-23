import React, { useEffect, useState } from 'react'
import axios from "../../Utils/axios"
import DataTable from 'react-data-table-component'
import {allTherapists, RetrieveUpdateDeleteTherapist} from "../../Utils/constants"


import {useSelector} from 'react-redux'
import DeleteTherapist from '../TherapistManagement/DeleteTherapist'
import BlockTheapist from '../TherapistManagement/BlockTheapist'

const TherapistsTable = () => {

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState("")

    const [blockOpen, setBlockOpen] = useState(false)
    const [toBeBlocked, setToBeBlocked] = useState("")

    const [therapistTableUpdated, setTherapstTableUpdated] = useState(false)

    const [therapists, setTherapists] = useState([])
    const [search, setSearch] = useState("")
    const [filteredTherapists, setFilteredTherapists] = useState([])

    const [selectedStatus, setSelectedStatus] = useState(false)

    useEffect(()=>{
        console.log(selectedStatus)
    },[selectedStatus])

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'onreview', label: 'On Review' },
        { value: 'approved', label: 'Approved' },
      ];
    

      const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
      const access = authTokensAdmin?.access;


    const handleStatusChange = (row, e) => {
        console.log(e.target.value) 
        

        const body = new FormData()
        body.append('status', e.target.value)
        body.append('name', row.name)
        body.append('email', row.email)
       

        axios.put(`${RetrieveUpdateDeleteTherapist}${row.id}/`, body, {
            headers: { 
                "Authorization": `Bearer ${access}`, 
                "Content-Type" : 'multipart/form-data'
            }

        })
        .then((response)=>{
           
            console.log(response.data)
            setSelectedStatus(!selectedStatus)
           
        })
        .catch((error)=> console.log(error))
    };

    const getTherapists = async() => {
       
        // console.log(access)

        try{
            const response = await axios.get(allTherapists, {
                headers: { "Authorization": `Bearer ${access}`}
            })

            console.log(response.data)
    
            setTherapists(response.data)
            setFilteredTherapists(response.data)
            // setSelectedStatus(response.data.status)
            
        }
        catch (error){
            console.log(error)
        }
    }


    useEffect(()=>{
        getTherapists()
    }, [allTherapists, therapistTableUpdated, selectedStatus])


    useEffect(()=>{
        const result = therapists.filter(therapist => {
            return therapist.name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredTherapists(result)
    }, [search, therapists])


    const CustomTitle = () => <h5 className='justify-center'   >Registered Users</h5>;



    const columns = [
        {
            name: "First Name",
            selector: row => row.name,
            // sortable:true
        },
        {
            name: "Email Id",
            selector: row => row.email
        },
        {
          name: "Phone",
          selector: row => row.phone
        },
        {
            name: "Status",
            selector: row => {

                
      
                return(
            <>
                <select value={row.status} onChange={(e)=>handleStatusChange(row,e)}>
                    <option value="">Select status</option>
                    {statusOptions.map(option => (
                    <option key={option.value} value={option.value} >
                        {/* {console.log(row.status)} */}
                        {option.label}
                    </option>
                    ))}
                </select>
                </>)}

                
        },
        // {
        //     name: "Image",
        //     selector: row => <img width={50} height={50} src={`http://127.0.0.1:8000${row.image}`} alt="user"/>
        // },
     
        {
            name: "Block",
            cell: row => <>
            {row.is_active?
            <button onClick={()=>{
                setBlockOpen(true)
                setToBeBlocked(row)
                }} type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300">
                Block
            </button>
            :

            <button onClick={()=>{
                setBlockOpen(true)
                setToBeBlocked(row)
                }} type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300">
                Unblock
            </button>
            }
            {toBeBlocked && <BlockTheapist blockOpen={blockOpen} setBlockOpen={setBlockOpen} toBeBlocked={toBeBlocked} setTherapstTableUpdated={setTherapstTableUpdated} therapistTableUpdated={therapistTableUpdated} />}

            </>
        },
     
        {
            name: "Delete",
            cell: row => <>
                <button  onClick={()=>{
                    setDeleteOpen(true)
                    setToBeDeleted(row)
                    }} type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-red-400 hover:bg-red-500 focus:red-4 focus:ring-red-300">Delete </button>
                {toBeDeleted&& <DeleteTherapist deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} toBeDeleted={toBeDeleted} setTherapstTableUpdated={setTherapstTableUpdated} therapistTableUpdated={therapistTableUpdated}/>}
                </>
    
        },
    
        ]
    

  return (

    <DataTable
     title = {<CustomTitle/>}
     columns={columns} 
     data={filteredTherapists} 
     direction="auto"
     pagination
     fixedHeader
     fixedHeaderScrollHeight='300px'
   
     selectableRows
     selectableRowsHighlight
     highlightOnHover
    //  actions={
    //    <div className='flex justify-center' onClick={()=>navigate("/admin/dashboard/create-client")}>
    //     <div className='cursor-pointer justify-center  bg-blue-400 px-3 pb-1  m-6 rounded-md text-white'>
    //       <small>Create User</small>
    //     </div>
    //     {/* <CreateClient /> */}
    //     {/* { modalOn && <CreateClient setModalOn={setModalOn} />} */}
    //    </div>
    //  }
     subHeader
     subHeaderComponent = {
        <input 
        type="text" 
        placeholder='Search'
        className=' text-sm rounded-lg block pl-10 p-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-red-500 focus:border-red-500'
        value = {search}
        onChange = {(e)=> setSearch(e.target.value)}
        ></input>
     }
    
     />

    
  )
}

export default TherapistsTable