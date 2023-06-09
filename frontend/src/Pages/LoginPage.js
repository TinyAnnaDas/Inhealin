import React from 'react'
import Footer from '../Components/Footer/Footer'
import ClientLogin from '../Components/Login/ClientLogin'
import Navbar from '../Components/Navbar/Nabar'

export const LoginPage = () => {
  
  return (
    <div className='flex flex-col '>
        <Navbar/>
        <ClientLogin/>
        <Footer/>
    </div>
  )
}

export default LoginPage
