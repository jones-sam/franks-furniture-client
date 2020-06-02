import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

// Bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { FaShoppingCart } from "react-icons/fa"

export class cart extends Component {
  render() {
    const { items, totalCost, totalQuanity } = this.props.data.cart
    console.log(items)
    return (
      <Container>
        <h1>Your Cart</h1>
        {items.length > 0 ? (
          <Row>
            <Col lg={9}>
              <ListGroup className="w-100">
                {items.map((item) => (
                  <ListGroup.Item key={item.itemId}>
                    <Row>
                      <Col md={4}>
                        <Image src={item.itemImage} thumbnail />
                      </Col>
                      <Col md={4}>
                        <h4>{item.name}</h4>
                        <p>
                          {item.quantity} x <i>${item.price.toFixed(2)}</i>
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col lg={3}>
              <ListGroup className="w-100 cart-total-box">
                <ListGroup.Item>
                  <h3>Total</h3>

                  {items.map((item) => (
                    <Fragment key={item.itemId}>
                      <p className="m-0">
                        {item.quantity} {item.name} x{" "}
                        <i>${item.price.toFixed(2)}</i>
                      </p>
                    </Fragment>
                  ))}
                  <hr />
                  <h4>${totalCost.toFixed(2)}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="success" className="w-100">
                    <b>Checkout </b>
                    <FaShoppingCart />
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        ) : (
          <>
            <h4 className="mt-5">looks like nothing is here</h4>
            <Link to="/">
              <Button>Add something!</Button>
            </Link>
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(cart)
