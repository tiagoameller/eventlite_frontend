import React from "react"
import EventSummary from "./EventSummary"

const EventsList = props => (
  <div>
    {props.events.map((event) => {
      return(
        <EventSummary key={event.id} event={event}/>
      )
    })}
  </div>
)

export default EventsList

