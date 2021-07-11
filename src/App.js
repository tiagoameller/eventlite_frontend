import React from "react"
import AppHeader from "./components/AppHeader"
import Eventlite from "./components/Eventlite"
import Auth from "./components/Auth"

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
      {currentUser() ? <Eventlite /> : <><Auth kind="signin" /> <Auth kind="signup" /> </>}
    </div>
  );
}

export default App
