import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import home from "./pages/home"
import item from "./pages/item"
import Navbar from "./components/layout/Navbar"
import "./App.css"

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/items/:itemID" component={item} />
        </Switch>
      </Router>
    )
  }
}

export default App
