import React from 'react'
import './EasterEgg.css'
import {Controller} from './Controller'


 export const EasterEgg = () => {
  return (
    <div className="easter-egg-wrapper">
        <div className="easter-egg-container">
          <span><h4>You scrolled so far<br/>Enjoy this 3D Corvette car</h4></span>

          <Controller />
         </div>
    </div>
  )
}

export default EasterEgg