import React from 'react'
import SideNav from '../components/Kitchen/SideNav'
import Welcome from '../components/Kitchen/Welcome'
import WelcomeBackground from "../assets/welcome-background.png"
const KitchenPage = () => {
  return (
    <div className='kitchen'>
      <SideNav />
      <Welcome />
    </div>  
  )
}

export default KitchenPage  