   import React, { useEffect, useState } from 'react'
   import axios from "../../Utils/axios"
   import DataTable from 'react-data-table-component'
   import {allClients} from "../../Utils/constants"

// import EditUser from '../EditUser/EditUser';
// import CreateClient from '../CreateClient/CreateClient';

// import Swal from 'sweetalert2';
import {useSelector} from 'react-redux'
// import {useDispatch} from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import {delete_user} from '../../features/UpdateUserSlice'



   function UserTable() {


  

 
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    // const navigate = useNavigate()

    // const [isMounted, setIsMounted] = useState(false);
    // const dispatch = useDispatch()

    const createdUser = useSelector((state )=> state.updateUser.createdUser)
    const editedUser = useSelector((state )=> state.updateUser.editedUser)
    const deletedUser = useSelector((state)=> state.updateUser.deletedUser)

  
      // const handleDelete = (userId) => {
      //   Swal.fire({
      //     title: 'Are you sure?',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes',
      //   })
      //   .then((result) => {
      //     if (result.isConfirmed) {
      //       const authTokens = JSON.parse(localStorage.getItem('authTokens'))
      //       const access = authTokens.access;
      //       // const url = `${userDelete}${userId}`
      //       axios
      //       .get(url, {
      //         headers: { "Authorization": `Bearer ${access}`},
      //       })
      //       .then((response) => {
      //         dispatch(delete_user())
      //       })
      //       .catch((error) => {
      //         console.log("error",error);
      //       });

      //     }
      //   });
      // };



    
    const getUsers = async() => {
        const authTokensAdmin = JSON.parse(localStorage.getItem('authTokensAdmin'))
        const access = authTokensAdmin?.access;

        // console.log(access)

        try{
            const response = await axios.get(allClients, {
                headers: { "Authorization": `Bearer ${access}`}
            })
    
            setUsers(response.data)
            setFilteredUsers(response.data)
        }
        catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsers()
    }, [createdUser,editedUser, deletedUser])

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