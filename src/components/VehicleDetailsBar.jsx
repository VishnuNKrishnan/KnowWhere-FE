import React, { useState, useEffect } from 'react'
import CallDriverQRCode from './popups/CallDriverQRCode'
import './VehicleDetailsBar.css'
import db from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import CallDriverBtn from './CallDriverBtn'
import VehicleDetailsBarInfoBtn from './VehicleDetailsBarInfoBtn'
import VehicleDetailsBarShareBtn from './VehicleDetailsBarShareBtn'
import VehicleDetailsBarCloseBtn from './VehicleDetailsBarCloseBtn'
import VisitedLocationsListSymbol from '../uiAssets/list.svg'

function VehicleDetailsBar(props) {
  const [onlineStatus, setOnlineStatus] = useState({
    class: 'offline', //The CSS Class - Online or Offline
    text: 'offline', //The text to be displayed in the UI - Online or Offline
  })

  const [licensePlate, setLicensePlate] = useState('Loading...')
  const [driverName, setDriverName] = useState('Fetching Driver...')
  const [driverContact, setDriverContact] = useState('Loading......')
  const [vehicleType, setVehicleType] = useState('Loading......')
  const [vehicleGroup, setVehicleGroup] = useState('Loading......')
  const [speed, setSpeed] = useState(0)
  const [secondsAfterLastContact, setSecondsAfterLastContact] = useState(0) // Used to display online/offline status
  const [isOnline, setIsOnline] = useState(false)

  // const intervalId = setInterval(() => {
  //   setSecondsAfterLastContact(secondsAfterLastContact + 20)
  //   if (secondsAfterLastContact > 20) {
  //     setIsOnline(false)
  //   } else {
  //     setIsOnline(true)
  //   }
  // }, 20000)

  // isOnline
  //   ? setOnlineStatus({
  //       class: 'online', //The CSS Class - Online or Offline
  //       text: 'online', //The text to be displayed in the UI - Online or Offline
  //     })
  //   : setOnlineStatus({
  //       class: 'offline', //The CSS Class - Online or Offline
  //       text: 'offline', //The text to be displayed in the UI - Online or Offline
  //     })

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'vehicles', '484-lng-52q-452'), (doc) => {
      var docData = doc.data()
      setLicensePlate(docData.licensePlate)
      setDriverName(docData.driverName)
      setDriverContact(docData.driverContact)
      setVehicleType(docData.vehicleType)
      setVehicleGroup(docData.vehicleGroup)
      setSpeed(Math.round(docData.lastRecordedSpeed * 3.6)) //Multiply m/s value by 3.6 ti convert it to km/h
      setSecondsAfterLastContact(0)
      //console.log('Current data: ', doc.data())
    })
    return () => unsub
  }, [])

  // useEffect(() => {
  //   onSnapshot(
  //     collection(db, 'vehicles', `vgb-hjui-256-lox`, `providedWaypoints`),
  //     (snapshot) => {
  //       //console.log(snapshot.docs.map((doc) => doc.data()))

  //       const lastOnlineTimeStamp = snapshot.docs[4].data().lastOnline
  //       if (Date.now() - lastOnlineTimeStamp > 60000) {
  //         setOnlineStatus({
  //           class: 'offline', //The CSS Class - Online or Offline
  //           text: `${Math.round((Date.now() - lastOnlineTimeStamp) / 1000)}s`, //The text to be displayed in the UI - Online or Offline
  //         })
  //       } else {
  //         setOnlineStatus({
  //           class: 'online', //The CSS Class - Online or Offline
  //           text: 'online', //The text to be displayed in the UI - Online or Offline
  //         })
  //       }
  //     },
  //   )
  // }, [])
  return (
    <div className="vehicleDetailsBar">
      <div className="vehicleDetailsHolder">
        <div
          className="dpHolder"
          style={{
            backgroundImage: `url('https://yt3.ggpht.com/ytc/AKedOLQFgYQxDgOOOjZVAC67FHtllYB17ic_5fr2MAGzAQ=s900-c-k-c0x00ffffff-no-rj')`,
          }}
        ></div>
        <div>
          <div className="vehicleNumAndStatus">
            <h1>{licensePlate}</h1>
            <div className={`onlineStatus ${onlineStatus.class}`}>
              <p>{onlineStatus.text}</p>
            </div>
          </div>
          <p>
            {driverName}
            <span className="driverContactNumber"> | {driverContact}</span>
          </p>
          <p>Type: {vehicleType}</p>
          <p>Group: {vehicleGroup}</p>
        </div>
      </div>

      <div className="avgSpeedHolder">
        <p className="avgSpeed">{speed}</p>
        <p className="avgSpeedUnit">km/h</p>
      </div>

      <div className="actionsHolder">
        <CallDriverBtn />
        <VehicleDetailsBarInfoBtn />
        <VehicleDetailsBarShareBtn />
        <VehicleDetailsBarCloseBtn />
        <div
          className="visitedLocationsListToggleBtn"
          onClick={() => {
            props.setVisitedLocationsListToggleStatus(
              !props.visitedLocationsListToggleStatus,
            )
          }}
        >
          <img
            src={VisitedLocationsListSymbol}
            alt="Show/Hide visited locations"
          />
        </div>
      </div>
      <div className="outerAvgSpeedHolder">
        <p className="outerAvgSpeed">{speed}</p>
        <p className="outerAvgSpeedUnit">km/h</p>
      </div>
    </div>
  )
}

export default VehicleDetailsBar
