import React from 'react'
import Footer from '../Components/Footer/Footer'
import TherapistLogin from '../Components/Login/TherapistLogin'
import Navbar from '../Components/Navbar/Nabar'

const LoginPageTherapist = () => {
  return (
    <div>
        <Navbar/>
        <TherapistLogin/>
        <Footer/>
    </div>
  )
}

export default LoginPageTherapist