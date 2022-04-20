import React, { useState } from 'react'
import './VisitedLocationsListItem.css'

function VisitedLocationsListItem(props) {
  return (
    <div className="VisitedLocationsListItemCard">
      <div className="locationSymbolHolder">
        <div className="branchHolder">
          <div
            className="branch"
            style={
              props.isLastBranch ? { height: '50px' } : { height: '110px' }
            }
          ></div>
        </div>
        <div className="outerCircle"></div>
        <div className="innerCircle">
          <p>{props.time}</p>
        </div>
      </div>
      <div className="detailsHolder">
        <p className="locationName">{props.locationName}</p>
        <p className="timeAndSubLocation">{props.subLocationName}</p>
      </div>
    </div>
  )
}

export default VisitedLocationsListItem
