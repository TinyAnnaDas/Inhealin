   import React, { useEffect, useState } from 'react'
   import axios from "../../Utils/axios"
   import DataTable from 'react-data-table-component'
   import {allClients} from "../../Utils/constants"

// import EditUser from '../EditUser/EditUser';
// import CreateClient from '../CreateClient/CreateClient';

// import Swal from 'sweetalert2';
import {useSelector} from 'react-redux'
import DeleteClient from '../ClientManagement/DeleteClient'
import BlockClient from '../ClientManagement/BlockClient'
// import {useDispatch} from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import {delete_user} from '../../features/UpdateUserSlice'



   function UserTable() {


    const [deleteOpen, setDeleteOpen] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState("")
    const [userTableUpdated, setUserTableUpdated] = useState(false)


    const [blockOpen, setBlockOpen] = useState(false)
    const [toBeBlocked, setToBeBlocked] = useState("")
    // const [clientBlocked, setClientBlocked] = useState(false)

 



    // useEffect(()=>{
    //     console.log(clientBlocked)
    // },clientBlocked)
    

 
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    
    const getUsers = async() => {
        const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
        const access = authTokensAdmin?.access;

        // console.log(access)

        try{
            const response = await axios.get(allClients, {
                headers: { "Authorization": `Bearer ${access}`}
            })

            // console.log(typeof(response.data[0].is_active))
            console.log(response.data)
    
            setUsers(response.data)
            setFilteredUsers(response.data)
            // setClientBlocked(response.data.is_active)
        }
        catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsers()
    }, [userTableUpdated])

    useEffect(()=>{
        const result = users.filter(user => {
            return user.name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredUsers(result)
    }, [search, users])

    const CustomTitle = () => <h5 className='justify-center'   >Registered Users</h5>;
    // const CustomTitle = () => <h5 className='mt-5' style={{ textAlign: "right", textDecoration:"underline" }}>Registered Users</h5>;


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

        {toBeBlocked && <BlockClient blockOpen={blockOpen} setBlockOpen={setBlockOpen} toBeBlocked={toBeBlocked} setUserTableUpdated={setUserTableUpdated} userTableUpdated={userTableUpdated} />}
        </>
    },
 
    {
        name: "Delete",
        cell: row =>  <>
        <button  onClick={()=>{
            setDeleteOpen(true)
            setToBeDeleted(row)
            }} type="button" className="px-3 py-2 text-center font-medium text-xs focus:outline-none text-dark rounded-lg bg-red-400 hover:bg-red-500 focus:red-4 focus:ring-red-300">Delete </button>
        {toBeDeleted&& <DeleteClient deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} toBeDeleted={toBeDeleted} setUserTableUpdated={setUserTableUpdated} userTableUpdated={userTableUpdated}/>}
        </>

    },

    ]

     return (
 
     <DataTable
     title = {<CustomTitle/>}
     columns={columns} 
     data={filteredUsers} 
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
   
   export default UserTable