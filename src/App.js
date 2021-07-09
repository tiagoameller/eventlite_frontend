import React from "react"
import AppHeader from "./components/AppHeader"
import Eventlite from "./components/Eventlite"
import Login from "./components/Login"
import Signup from "./components/Signup"

const currentUser = () => {
  const user = localStorage.getItem("user")
  console.log(user)
  return user
}

function App() {
  return (
    <div className="App">
      <AppHeader />
      {/* The empty tag <></> we’re using is a shorthand for <React.Fragment></React.Fragment>. */}
      {currentUser() ? <Eventlite /> : <><Login /> <Signup /> </>}
    </div>
  );
}

export default App
