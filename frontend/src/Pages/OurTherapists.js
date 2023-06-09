import React from 'react'
import FilterTherapist from '../Components/Filter/FilterTherapist'
import Footer from '../Components/Footer/Footer'
import ListTherapist from '../Components/ListTherapist/ListTherapist'
import Navbar from '../Components/Navbar/Nabar'

const OurTherapists = () => {
  return (
    <div>
        <Navbar/>
        <FilterTherapist/>
        <ListTherapist/>
        <Footer/>
    </div>
  )
}

export default OurTherapists