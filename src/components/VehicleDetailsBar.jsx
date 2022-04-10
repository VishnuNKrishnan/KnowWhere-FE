import React, { useState, useEffect } from 'react'
import CallDriverQRCode from './popups/CallDriverQRCode'
import './VehicleDetailsBar.css'
import db from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

function VehicleDetailsBar() {
  const [onlineStatus, setOnlineStatus] = useState({
    class: 'online', //The CSS Class - Online or Offline
    text: 'online', //The text to be displayed in the UI - Online or Offline
  })
  const [avgSpeed, setAvgSpeed] = useState(138)
  useEffect(() => {
    onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      //console.log(snapshot.docs.map((doc) => doc.data()))

      const lastOnlineTimeStamp = snapshot.docs[2].data().lastOnline
      if (Date.now() - lastOnlineTimeStamp > 60000) {
        setOnlineStatus({
          class: 'offline', //The CSS Class - Online or Offline
          text: `${Math.round((Date.now() - lastOnlineTimeStamp) / 1000)}s`, //The text to be displayed in the UI - Online or Offline
        })
      } else {
        setOnlineStatus({
          class: 'online', //The CSS Class - Online or Offline
          text: 'online', //The text to be displayed in the UI - Online or Offline
        })
      }
    })
  }, [])
  return (
    <div className="vehicleDetailsBar">
      <div className="vehicleDetailsHolder">
        <div
          className="dpHolder"
          style={{
            backgroundImage: `url('https://www.onmanorama.com/content/dam/mm/en/entertainment/interviews/images/2022/2/18/johny-antony-interview-sq.jpg.transform/onm-relatedarticlesm/image.jpg')`,
          }}
        ></div>
        <div>
          <div className="vehicleNumAndStatus">
            <h1>DXB F 89569</h1>
            <div className={`onlineStatus ${onlineStatus.class}`}>
              <p>{onlineStatus.text}</p>
            </div>
          </div>
          <p>Rowan Atkinson | +971 50 626 5986</p>
          <p>Type: Container Carrier</p>
          <p>Group: Heavy Deliveries</p>
        </div>
      </div>

      <div className="avgSpeedHolder">
        <p className="avgSpeed">{avgSpeed}</p>
        <p className="avgSpeedUnit">km/h</p>
      </div>

      <div className="actionsHolder">
        <div className="btn"></div>
        <div className="btn"></div>
        <div className="btn"></div>
      </div>
    </div>
  )
}

export default VehicleDetailsBar
