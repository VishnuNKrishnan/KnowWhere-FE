// Component that displays the movement and details of a single vehicle in the fleet

import React, { useState } from 'react'
import MapHolder from './MapHolder'
import VehicleDetailsBar from './VehicleDetailsBar'
import VisitedLocationsList from './VisitedLocationsList'
import './TrackOne.css'

function TrackOne() {
  //Visited locations list is an individual component. However, ots toggle button is part of the vehicle details bar component, due to ease of CSS styling. Hence, visitedLocationsListIsActive and its set function is declared here - in TrackOne.jsx, the container - and passed into both the components through props.
  const [
    visitedLocationsListToggleStatus,
    setVisitedLocationsListToggleStatus,
  ] = useState(false)

  return (
    <div className="TrackOneWrapper">
      <MapHolder />
      <VisitedLocationsList
        visitedLocationsListToggleStatus={visitedLocationsListToggleStatus}
        setVisitedLocationsListToggleStatus={
          setVisitedLocationsListToggleStatus
        }
      />
      <VehicleDetailsBar
        visitedLocationsListToggleStatus={visitedLocationsListToggleStatus}
        setVisitedLocationsListToggleStatus={
          setVisitedLocationsListToggleStatus
        }
      />
    </div>
  )
}

export default TrackOne
