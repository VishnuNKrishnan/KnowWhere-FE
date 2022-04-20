import React from 'react'
import './VehicleDetailsBarBtns.css'
import symbol from '../uiAssets/close.svg'

function VehicleDetailsBarCloseBtn() {
  return (
    <div className="actionBtn">
      <img src={symbol} alt="Close" />
    </div>
  )
}

export default VehicleDetailsBarCloseBtn
