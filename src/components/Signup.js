import React from "react"
import axios from "axios"
import FormErrors from "./FormErrors"

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formErrors: {}
    }
    this.logo = React.createRef()
  }

  handleSignup = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: "https://tiago-eventlite.herokuapp.com/auth",
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .then(response => {
      localStorage.setItem("user",
        JSON.stringify({
          "access-token": response.headers["access-token"],
          "client": response.headers["client"],
          "uid": response.data.data.uid
      }))
      window.location = "/"
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data.errors})
    })
  }

  render () {
    return (
      <div>
        <h2>Sign up</h2>
        <FormErrors formErrors = {this.state.formErrors} />
        <form onSubmit={this.handleSignup} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default Signup