import React from "react"
import axios from "axios"
import FormErrors from "./FormErrors"

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formErrors: {}
    }
    this.logo = React.createRef()
  }

  handleLogin = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: "https://tiago-eventlite.herokuapp.com/auth/sign_in",
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .then(response => {
      console.log(response)
      localStorage.setItem(
        "user",
        JSON.stringify({
          "access-token": response.headers["access-token"],
          "client": response.headers["client"],
          "uid": response.data.data.uid
        })
      )
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
        <h2>Log in</h2>
        <FormErrors formErrors = {this.state.formErrors} />
        <form onSubmit={this.handleLogin}>
          <input name="email" ref={(input) => {this.email = input}} />
          <input name="password" ref={(input) => {this.password = input}} />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Login