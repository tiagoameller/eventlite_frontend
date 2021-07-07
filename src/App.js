import React from "react"
import Eventlite from "./components/Eventlite"
import Login from "./components/Login"

const currentUser = () => {
  const user = localStorage.getItem("user")
  console.log(user)
  return user
}

function App() {
  return (
    <div className="App">
      {currentUser() ? <Eventlite /> : <Login />}
    </div>
  );
}

export default App
