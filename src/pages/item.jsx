import React, { Component } from "react"

// Redux
import { connect } from "react-redux"
import { getItem } from "../redux/actions/dataActions"

// Bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// Icons
import { FaShoppingCart } from "react-icons/fa"

export class item extends Component {
  componentDidMount() {
    this.props.getItem(this.props.match.params.itemId)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("Submitted")
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
                size="lg"
                type="number"
                placeholder="Quantity"
                min="1"
              />
              <Button size="lg" type="submit">
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

const mapDispatchToProps = { getItem }

export default connect(mapStateToProps, mapDispatchToProps)(item)
