import React, { Component } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import store from "store"

// Redux
import { connect } from "react-redux"
import { getItem, addToCart } from "../redux/actions/dataActions"

// Bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// Icons
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"

const MySwal = withReactContent(Swal)

export class item extends Component {
  state = {
    quantity: 1,
  }
  componentDidMount() {
    this.props.getItem(this.props.match.params.itemId)
  }

  componentDidUpdate() {
    store.set("cart", this.props.data.cart)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addToCart(this.props.data.item, Number(this.state.quantity))
    MySwal.fire({
      title: `Success!`,
      html: `Added ${this.state.quantity}<b> "${this.props.data.item.name}"</b> to your cart!`,
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      icon: "success",
    })
  }
  render() {
    const { item } = this.props.data
    return (
      <Container>
        <Row>
          <Col md={4}>
            <Image src={item.itemImage} thumbnail></Image>
          </Col>
          <Col md={8}>
            <h2>{item.name}</h2>
            <h5>${item.price}</h5>
            <Form inline className="mt-3" onSubmit={this.handleSubmit}>
              <Form.Control
                name="quantity"
                className="item-quantity-input"
                onChange={this.handleChange}
                size="lg"
                type="number"
                placeholder="Quantity"
                value={this.state.quantity}
                min="1"
              />
              <Button size="lg" type="submit" className="item-add-button">
                Add to Cart <FaShoppingCart />
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>About this item</h4>
            <p>{item.description}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = { getItem, addToCart }

export default connect(mapStateToProps, mapDispatchToProps)(item)
