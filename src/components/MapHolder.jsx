import React, { useState, useEffect } from 'react'
import BingMapsReact from 'bingmaps-react'
import { ReactBingmaps } from 'react-bingmaps'
import './MapHolder.css'
import db from '../firebase'
import { collection, query, onSnapshot, where } from 'firebase/firestore'

function MapHolder() {
  const [polylineCoordsArray, setPolylineCoordsArray] = useState([])
  const [mapCenter, setMapCenter] = useState([])
  var coordsArray = []

  useEffect(() => {
    const q = query(
      collection(db, `vehicles`, `484-lng-52q-452`, `providedWaypoints`),
    )
    const unsub = onSnapshot(q, (querySnapshot) => {
      coordsArray = [] //TEST COMMAND - TO PREVENT LINES JOINING ORIGIN AND CURRENT POINT AFTER EVERY UPDATE. REMOVE IF NECESSARY.
      querySnapshot.forEach((doc) => {
        const toTimestamp = (strDate) => {
          const dt = Date.parse(strDate)
          return dt / 1000
        }

        //console.log(doc.data())
        coordsArray.push([doc.data().latitude, doc.data().longitude])

        //console.log(coordsArray)
      })
      setPolylineCoordsArray(coordsArray)
      setMapCenter(coordsArray[coordsArray.length - 1])
      //console.log(`END`)
    })
    return () => unsub
  }, [])
  //console.log(polylineCoordsArray)

  return (
    <div className="mapHolder">
      <ReactBingmaps
        bingmapKey={process.env.REACT_APP_BING_MAPS_API_KEY}
        navigationBarMode={'none'}
        mapTypeId={'road'}
        center={mapCenter}
        const
        pushPins={[
          {
            location: mapCenter,
            option: { color: 'green' },
          },
        ]}
        polyline={{
          location: polylineCoordsArray,
          option: {
            strokeColor: 'green',
            strokeThickness: 3,
            strokeDashArray: [3, 1.5],
          },
        }}
      ></ReactBingmaps>
      {/* <BingMapsReact
        bingMapsKey={process.env.REACT_APP_BING_MAPS_API_KEY}
        pushPins={pushPins}
        polyline={line}
        mapOptions={{
          navigationBarMode: 'square',
        }}
        viewOptions={{
          center: { latitude: 25.057, longitude: 55.25939 },
          mapTypeId: 'canvasLight',
          zoom: 11,
          maxZoom: 12,
        }}
      /> */}
    </div>
  )
}

export default MapHolder
