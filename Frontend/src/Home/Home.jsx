import React from 'react'
import {NavBar} from '../NavBar/NavBar'
import {Hero} from '../Hero/Hero.jsx'
import {Tabs} from '../Tabs/Tabs.jsx'
import {Community} from '../Community/Community.jsx'

export const Home = () => {
  return (
    <div className='Home'>
    <Hero/>
    <Tabs/>
    <Community/>
    </div>
  )
}

export default Home