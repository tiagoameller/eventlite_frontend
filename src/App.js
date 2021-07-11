import React from "react"
import AppHeader from "./components/AppHeader"
import Eventlite from "./components/Eventlite"
import Auth from "./components/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Route path="/">
        <AppHeader />
      </Route>
      <Route exact path="/">
        <Eventlite />
      </Route>
      <Route exact path="/login">
        <Auth kind="signin" />
      </Route>
      <Route exact path="/signup">
        <Auth kind="signup" />
      </Route>
    </Router>
  );
}

export default App
