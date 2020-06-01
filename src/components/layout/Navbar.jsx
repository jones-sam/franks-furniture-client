import React, { Component } from "react"

// bootstrap
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavLink from "react-router-dom/NavLink"
import Link from "react-router-dom/Link"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

export class MainNavbar extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="mb-5">
          <Navbar.Brand>
            <Link to="/">Frank's Furniture</Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form> */}
        </Navbar>
      </>
    )
  }
}

export default MainNavbar
