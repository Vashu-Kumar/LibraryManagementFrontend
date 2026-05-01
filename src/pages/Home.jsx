import React from 'react'
import Hero from '../components/Hero.jsx'
import NewArrivals from '../components/NewArrivals.jsx'
import Achievements from '../components/Achievements.jsx'

const Home = () => {
  return (
    <div className='m-4'>
      <Hero />
      <NewArrivals />
      <Achievements />

    </div>
  )
}

export default Home
