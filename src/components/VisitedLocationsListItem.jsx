import React, { useState } from 'react'
import './VisitedLocationsListItem.css'

function VisitedLocationsListItem(props) {
  return (
    <div className="VisitedLocationsListItemCard">
      <div className="locationSymbolHolder">
        <div className="branchHolder">
          <div
            className="branch"
            style={props.isLastBranch ? { height: '50px' } : { height: '85px' }}
          ></div>
        </div>
        <div className="outerCircle"></div>
        <div className="innerCircle"></div>
      </div>
      <div>
        <p className="locationName">{props.locationName}</p>
        <p className="timeAndSubLocation">
          {props.time} | {props.subLocationName}
        </p>
      </div>
    </div>
  )
}

export default VisitedLocationsListItem
