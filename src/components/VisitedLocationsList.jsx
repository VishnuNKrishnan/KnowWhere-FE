import React, { useState } from 'react'
import { useEffect } from 'react'
import VisitedLocationsListItem from './VisitedLocationsListItem'
import VisitedLocationsListOptions from './VisitedLocationsListOptions'
import './VisitedLocationsList.css'
import db from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import LoadingBarSlim from './loaders/LoadingBarSlim'

function VisitedLocationsList(props) {
  const [loading, setLoading] = useState(true)
  const [
    visitedLocationsListIsActive,
    setVisitedLocationsListIsActive,
  ] = useState(false)
  const [visitedLocationsList, setVisitedLocationsList] = useState([])
  useEffect(() => {
    onSnapshot(
      collection(db, 'vehicles', '484-lng-52q-452', 'identifiedLocations'),
      (snapshot) => {
        //setVisitedLocationsList(snapshot.docs.map((doc) => doc.data()))
        const toTimestamp = (strDate) => {
          const dt = Date.parse(strDate)
          return dt / 1000
        }
        const startTimestamp = toTimestamp('04/19/2022 00:00:00')
        if (Date.now() > startTimestamp) {
          setVisitedLocationsList([...snapshot.docs])
        }
        setLoading(false)
      },
    )
  }, [])

  var listHolderToggleClass
  props.visitedLocationsListToggleStatus
    ? (listHolderToggleClass = 'active')
    : (listHolderToggleClass = 'inactive')

  return (
    <div className={`listHolder ${listHolderToggleClass}`}>
      <VisitedLocationsListOptions />
      {loading ? (
        <LoadingBarSlim display={'block'} />
      ) : (
        <LoadingBarSlim display={'none'} />
      )}
      {visitedLocationsList.map((obj, index) => {
        var isLastBranch
        if (visitedLocationsList.length == index + 1) {
          isLastBranch = true
        } else {
          isLastBranch = false
        }
        {
          var timestampFromObject = new Date(
            obj.data().timestampOfVehiclePresence,
          )
          var timestampHours = timestampFromObject.getHours()
          if (timestampHours < 10) {
            timestampHours = `0${timestampFromObject.getHours()}`
          }
          var timestampMinutes = timestampFromObject.getMinutes()
          if (timestampMinutes < 10) {
            timestampMinutes = `0${timestampFromObject.getMinutes()}`
          }
          var timestampOfVehiclePresence = `${timestampHours}:${timestampMinutes}`

          //Location Details Formatting
          var mainLocation
          if (obj.data().results[0].components.neighbourhood) {
            mainLocation = obj.data().results[0].components.neighbourhood
          } else if (obj.data().results[0].components.suburb) {
            mainLocation = obj.data().results[0].components.suburb
          }

          var subLocation
          if (obj.data().results[0].components.road) {
            subLocation = obj.data().results[0].components.road
          }

          if (obj.data().results[0].components.city) {
            if (subLocation != '') {
              subLocation += ', '
            }
            subLocation += obj.data().results[0].components.city
          } else if (obj.data().results[0].components.state) {
            if (subLocation != '') {
              subLocation += ', '
            }
            subLocation += obj.data().results[0].components.state
          }
        }
        return (
          <VisitedLocationsListItem
            key={index}
            locationName={mainLocation}
            subLocationName={subLocation}
            time={timestampOfVehiclePresence}
            isLastBranch={isLastBranch}
          />
        )
      })}
      {/* <VisitedLocationsListItem
        locationName="Abu Shagara"
        subLocationName="Sharjah"
        time="14:30"
      /> */}
    </div>
  )
}

export default VisitedLocationsList
