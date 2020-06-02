import React, { Component } from "react"
import { Link } from "react-router-dom"

// bootstrap
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavItem from "react-bootstrap/NavItem"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import { LinkContainer } from "react-router-bootstrap"

// Icons
import { FaShoppingCart } from "react-icons/fa"

import { connect } from "react-redux"

export class MainNavbar extends Component {
  render() {
    const { totalQuantity } = this.props.data.cart
    return (
      <>
        <Navbar bg="dark" variant="dark" className="mb-5">
          <Navbar.Brand>
            <Link to="/">Frank's Furniture</Link>
          </Navbar.Brand>
          <Nav className="w-100">
            <NavItem className="ml-auto">
              <Link to="/cart" className="text-white">
                <b>Cart </b>
              </Link>

              <Badge variant="success">{totalQuantity}</Badge>
            </NavItem>
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

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar)
