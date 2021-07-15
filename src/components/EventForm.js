import React from "react"
import FormErrors from "./FormErrors"
import PropTypes from "prop-types"
import validations from "../validations"
import axios from "axios"

class EventForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: {value: "", valid: false},
      start_datetime: {value: "", valid: false},
      location: {value: "", valid: false},
      formErrors: {},
      formValid: false,
      editing: false
    }
  }

  componentDidMount () {
    if(this.props.match) {
      this.setState({editing: this.props.match.path === '/events/:id/edit'})
    }
    if(this.props.match) {
      axios({
        method: 'GET',
        url: `https://tiago-eventlite.herokuapp.com/api/v1/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem("user"))
      }).then((response) => {
        this.setState({
          title: {valid: true, value: response.data.title},
          location: {valid: true, value: response.data.location},
          start_datetime: {valid: true, value: new Date(response.data.start_datetime).toDateString()},
        }, this.validateForm)
      })
    }
  }


  static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
  }

  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, EventForm.formValidations[name]))
  }

  handleSubmit = e => {
    e.preventDefault()

    let event = { title: this.state.title.value, start_datetime: this.state.start_datetime.value, location: this.state.location.value }
    const method = this.state.editing ? "PUT" : "POST"
    const url = this.state.editing ? `https://tiago-eventlite.herokuapp.com/api/v1/events/${this.props.match.params.id}` : "https://tiago-eventlite.herokuapp.com/api/v1/events"
    axios({
      method: method,
      url: url,
      headers: JSON.parse(localStorage.user),
      data: { event: event }
    })
    .then(response => {
      if(!this.state.editing && this.props.onSuccess) {
        this.addNewEvent(response.data)
      }
      this.resetFormErrors();
    })
    .catch(error => {
      this.setState({formErrors: error.response.data})
    })
  }

  validateField (fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if(!valid) {
        errors = errors.concat([fieldError])
      }
      return(errors);
    }, []);

    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }

  validateForm () {
    this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  deleteEvent = () => {
    if(window.confirm("Are you sure?")) {
      axios({
        method: "DELETE",
        url: `https://tiago-eventlite.herokuapp.com/api/v1/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem("user"))
      }).then((response) => {
        this.props.history.push("/")
      })
    }
  }

  render() {
    return (
      <div>
        <h4>{this.state.editing ? "Edit Event" : "Create an Event"}</h4>
        <FormErrors formErrors = {this.state.formErrors} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={this.state.title.value} onChange={this.handleInput} />
          <input type="text" name="start_datetime" placeholder="Date" value={this.state.start_datetime.value} onChange={this.handleInput} />
          <input type="text" name="location" placeholder="Location" value={this.state.location.value} onChange={this.handleInput} />
          <input type="submit" value={(this.state.editing ? "Edit" : "Create") + " Event"}
           disabled={!this.state.formValid} />
        </form>
        { this.state.editing &&
          <p>
            <button onClick={this.deleteEvent}>Delete Event</button>
          </p>
        }
      </div>
    )
  }
}

EventForm.propTypes = {
  onSuccess: PropTypes.func
}

export default EventForm