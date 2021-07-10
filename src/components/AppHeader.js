/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import axios from "axios"

const handleSignOut = (e) => {
  e.preventDefault()
  axios({
    method: "DELETE",
    url: "https://tiago-eventlite.herokuapp.com/auth/sign_out",
    data: JSON.parse(localStorage.user)
  })
  .then(() => {
    localStorage.removeItem("user")
    window.location = "/"
  })
}

function AppHeader() {
  const currentUser = localStorage.getItem("user")
  return (
    <div>
      {currentUser &&
        <div style={{float: "right"}}>
          {JSON.parse(currentUser).uid}
          <a href="#" onClick={handleSignOut}>Sign out</a>
        </div>
      }
      <h1 className="logo">Eventlite</h1>
    </div>
  )
}

export default AppHeader
