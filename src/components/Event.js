import axios from "axios"
import React from "react"

const formatDate = datetime =>
  new Date(datetime).toDateString()
class Event extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: {}
    }
  }

  componentDidMount () {
    axios({
      method: "GET",
      url: `https://tiago-eventlite.herokuapp.com/api/v1/events/${this.props.match.params.id}`,
      // url: `http://localhost:3001/api/v1/events/${this.props.match.params.id}`,
      headers: JSON.parse(localStorage.getItem("user"))
    }).then((response) => {
      this.setState({event: response.data})
    })
  }

  render () {
    return (
      <div className="event">
        <h2 className="event-title">{this.state.event.title}</h2>
        <div className="event-datetime">{formatDate(this.state.event.start_datetime)}</div>
        <div className="event-location">{this.state.event.location}</div>
      </div>
    )
  }
}

export default Event

