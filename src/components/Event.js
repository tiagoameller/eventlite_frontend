import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const formatDate = datetime =>
  new Date(datetime).toDateString()

function Event(props) {
  const [event, setEvent] = useState({})
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://tiago-eventlite.herokuapp.com/api/v1/events/${props.match.params.id}`,
      // url: `http://localhost:3001/api/v1/events/${props.match.params.id}`,
      headers: JSON.parse(localStorage.getItem("user"))
    }).then((response) => {
      setEvent(response.data)
    })
  }, [props.match.params.id])

  return (
      <div className="event">
        {event.currentUserCanEdit && <Link to={`/events/${props.match.params.id}/edit`}>Edit</Link>}
        {event.image_url && <img src={event.image_url} alt="event" style={{width: "500px", aspectRatio: "auto"}} />}
        <h2 className="event-title">{event.title}</h2>
        <div className="event-datetime">{formatDate(event.start_datetime)}</div>
        <div className="event-location">{event.location}</div>
        <div className="event-description">{event.description}</div>
      </div>
  )
}

export default Event
