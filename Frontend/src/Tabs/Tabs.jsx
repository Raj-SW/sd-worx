import React from 'react'
import './Tabs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCheckDouble,faCar } from '@fortawesome/free-solid-svg-icons'

export const Tabs = () => {
  return (
    <div className="tab-wrapper">

        <h5>Are you a commuter? </h5>

        <h4>Get Started </h4>

          <div className="tab-containers">

          <div className='tab'>
            <FontAwesomeIcon icon={faUser}  className='fa-2x'/>
            <span>Set Up Your Profile</span>
            <span>Enter your pick up or drop off location and your roaster</span>
          </div>

          <div className='tab'>
            <FontAwesomeIcon icon={faCheckDouble}  className='fa-2x'/>
            <span>Select your Carpooler</span>
            <span>Our AI will provide available carpoolers in your area or select one of your preference </span>
          </div>

          <div className='tab'>
            <FontAwesomeIcon icon={faCar}  className='fa-2x'/>
            <span>Enjoy your Ride</span>
            <span>Settle your carpooler payments seemlessly and make sure to update yur roaster</span>
          </div>

       </div>

    </div>
  )
}

