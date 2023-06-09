import React from 'react'
import Footer from '../Components/Footer/Footer'
import Hero from '../Components/Home/Hero/Hero'
import HeroTwo from '../Components/Home/Hero/HeroTwo'
import ReviewSection from '../Components/Home/ReviewSection/ReviewSection'
import Navbar from '../Components/Navbar/Nabar'

const Home = () => {

  const client = true


  return (
    <div>
        <Navbar/>
        <Hero client={client}/>
        <HeroTwo/>
        <ReviewSection/>
        <Footer/>
    </div>
  )
}

export default Home