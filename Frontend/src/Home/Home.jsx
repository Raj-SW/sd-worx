import React from 'react'
import {Hero} from '../Hero/Hero.jsx'
import {Tabs} from '../Tabs/Tabs.jsx'
import {Community} from '../Community/Community.jsx'
import {EasterEgg} from '../EasterEgg/EasterEgg.jsx'

export const Home = () => {
  return (
    <div className='Home'>
    <Hero/>
    <Tabs/>
    <Community/>
    <EasterEgg/>
    </div>
  )
}

export default Home