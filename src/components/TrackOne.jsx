// Component that displays the movement and details of a single vehicle in the fleet

import React from 'react'
import MapHolder from './MapHolder'
import VehicleDetailsBar from './VehicleDetailsBar'
import VisitedLocationsList from './VisitedLocationsList'
import './TrackOne.css'

function TrackOne() {
  return (
    <div className="TrackOneWrapper">
      <MapHolder />
      <VisitedLocationsList />
      <VehicleDetailsBar />
    </div>
  )
}

export default TrackOne
