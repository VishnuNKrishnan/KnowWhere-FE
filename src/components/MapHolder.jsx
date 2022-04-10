import React, { useState, useEffect } from 'react'
import BingMapsReact from 'bingmaps-react'
import { ReactBingmaps } from 'react-bingmaps'
import './MapHolder.css'
import db from '../firebase'
import { collection, onSnapshot, QuerySnapshot } from 'firebase/firestore'

function MapHolder() {
  const [polylineCoordsArray, setPolylineCoordsArray] = useState([])
  const [mapCenter, setMapCenter] = useState([25, 45])
  useEffect(() => {
    onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      //console.log(snapshot.docs[2].data().providedWayPoints)
      var coordsForPolyline = []
      snapshot.docs[2].data().providedWayPoints.map((obj) => {
        coordsForPolyline.push([obj.latitude, obj.longitude])

        setPolylineCoordsArray(coordsForPolyline)
        const indexOfLastItemInCoordsArray = coordsForPolyline.length - 1
        const mapCenterCoords = coordsForPolyline[indexOfLastItemInCoordsArray]
        setMapCenter(mapCenterCoords)
      })
      console.log(JSON.stringify(coordsForPolyline))
    })
  }, [])
  return (
    <div className="mapHolder">
      <ReactBingmaps
        bingmapKey={process.env.REACT_APP_BING_MAPS_API_KEY}
        navigationBarMode={'square'}
        mapTypeId={'road'}
        center={mapCenter}
        const
        pushPins={[
          {
            location: [9.9612851, 76.3095904],
            option: { color: 'green' },
          },
          {
            location: [9.4061832216136, 76.350925712814],
            option: { color: 'green' },
          },
          {
            location: [8.8941318360417, 76.863270016097],
            option: { color: 'green' },
          },
          {
            location: [8.661555317559, 76.91072186433],
            option: { color: 'green' },
          },
        ]}
        polyline={{
          location: polylineCoordsArray,
          option: {
            strokeColor: 'green',
            strokeThickness: 5,
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
