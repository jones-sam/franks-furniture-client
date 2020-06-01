import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import home from "./pages/Home"
import Navbar from "./components/layout/Navbar"

import "./App.css"

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact="/" component={home} />
        </Switch>
      </Router>
    )
  }
}

export default App
