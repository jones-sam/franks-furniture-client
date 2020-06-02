import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import home from "./pages/home"
import item from "./pages/item"
import MainNavbar from "./components/layout/MainNavbar"
import "./App.css"
import store from "store"

class App extends Component {
  render() {
    return (
      <Router>
        <MainNavbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/items/:itemId" component={item} />
        </Switch>
      </Router>
    )
  }
}

export default App
