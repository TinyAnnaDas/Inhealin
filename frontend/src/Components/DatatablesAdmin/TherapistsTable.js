import React, { useEffect, useState } from 'react'
import axios from "../../Utils/axios"
import DataTable from 'react-data-table-component'
import {allTherapists} from "../../Utils/constants"


import {useSelector} from 'react-redux'

const TherapistsTable = () => {

    const [therapists, setTherapists] = useState([])
    const [search, setSearch] = useState("")
    const [filteredTherapists, setFilteredTherapists] = useState([])

    const getTherapists = async() => {
        const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
        const access = authTokensAdmin?.access;

        // console.log(access)

        try{
            const response = await axios.get(allTherapists, {
                headers: { "Authorization": `Bearer ${access}`}
            })
    
            setTherapists(response.data)
            setFilteredTherapists(response.data)
        }
        catch (error){
            console.log(error)
        }
    }


    useEffect(()=>{
        getTherapists()
    }, )


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
        // {
        //     name: "Image",
        //     selector: row => <img width={50} height={50} src={`http://127.0.0.1:8000${row.image}`} alt="user"/>
        // },
     
        {
            name: "Block Client",
            cell: row => <button type="button" class="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">Block</button>
        },
     
        {
            name: "Delete",
            cell: row => <button type="button" class="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-red-400 hover:bg-red-500 focus:red-4 focus:ring-red-300">Delete </button>
    
            // cell: row => <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(row.id)} >Delete the Plan</button>
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