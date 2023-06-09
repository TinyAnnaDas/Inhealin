import React from 'react'
import Hero from '../../Components/Home/Hero/Hero'
import Navbar from '../../Components/Navbar/Nabar'

const TherapistHome = () => {
    const therapist = true
  return (
    <div>
        <Navbar/>
        <Hero therapist={therapist}/>
    </div>
  )
}

export default TherapistHome