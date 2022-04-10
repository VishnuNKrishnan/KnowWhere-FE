// The Component that renders the home screen upon loading the app
import React from 'react'
import ChooseVehicleToTrack from './ChooseVehicleToTrack'
import './HomeScreen.css'
import HomeScreenBEVMap from './HomeScreenBEVMap'
import TrackOne from './TrackOne'

function HomeScreen() {
  return (
    <div className="HomeScreenWrapper">
      {/* <ChooseVehicleToTrack /> */}
      {/* <HomeScreenBEVMap /> */}
      <TrackOne />
    </div>
  )
}

export default HomeScreen
