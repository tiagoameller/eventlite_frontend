import React from "react"
import AppHeader from "./components/AppHeader"
import Eventlite from "./components/Eventlite"
import Auth from "./components/Auth"
import Event from "./components/Event"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

function App() {
  const currentUser = localStorage.getItem("user")
  return (
    <Router>
      <Route path="/">
        <AppHeader />
      </Route>
      <Route exact path="/">
        <Eventlite />
      </Route>
      <Route exact path="/login">
        {currentUser ? <Redirect to="/" /> : <Auth kind="signin" />}
      </Route>
      <Route exact path="/signup">
        {currentUser ? <Redirect to="/" /> : <Auth kind="signup" />}
      </Route>
      <Route exact path="/events/:id" render={routeProps => (
        <Event {...routeProps} />
      )}>
      </Route>
    </Router>
  );
}

export default App
