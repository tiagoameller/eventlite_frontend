import React from "react"
import axios from "axios"
import FormErrors from "./FormErrors"

// Used both for sign in and sign up
// pass prop: kind = ("signin" | "signup")
class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formErrors: {}
    }
    this.logo = React.createRef()
    if(this.props.kind === "signin") {
      // this.url = "http://localhost:3001/auth/sign_in"
      this.url = "https://tiago-eventlite.herokuapp.com/auth/sign_in"
      this.title = "Log in"
    } else {
      this.url = "https://tiago-eventlite.herokuapp.com/auth"
      // this.url = "http://localhost:3001/auth"
      this.title = "Sign up"
    }
  }

  handleAuth = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: this.url,
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
        <h2>{this.title}</h2>
        <FormErrors formErrors = {this.state.formErrors} />
        <form onSubmit={this.handleAuth}>
          <input name="email" ref={(input) => {this.email = input}} />
          <input name="password" ref={(input) => {this.password = input}} />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Auth