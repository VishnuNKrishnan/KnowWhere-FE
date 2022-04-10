import React, { useState } from 'react'
import { useEffect } from 'react'
import VisitedLocationsListItem from './VisitedLocationsListItem'
import VisitedLocationsListOptions from './VisitedLocationsListOptions'
import './VisitedLocationsList.css'
import db from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import LoadingBarSlim from './loaders/LoadingBarSlim'

function VisitedLocationsList() {
  const [loading, setLoading] = useState(true)
  const [visitedLocationsList, setVisitedLocationsList] = useState([])
  useEffect(() => {
    onSnapshot(collection(db, 'locations'), (snapshot) => {
      setVisitedLocationsList(snapshot.docs.map((doc) => doc.data()))
      setLoading(false)
    })
  }, [])

  return (
    <div className="listHolder">
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
        return (
          <VisitedLocationsListItem
            locationName={obj.name}
            subLocationName={obj.name}
            time={obj.timestamp}
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
