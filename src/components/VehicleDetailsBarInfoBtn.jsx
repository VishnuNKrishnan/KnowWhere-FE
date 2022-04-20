import React from 'react'
import './VehicleDetailsBarBtns.css'
import symbol from '../uiAssets/info.svg'

function VehicleDetailsBarInfoBtn() {
  return (
    <div className="actionBtn">
      <img src={symbol} alt="More Info" />
    </div>
  )
}

export default VehicleDetailsBarInfoBtn
