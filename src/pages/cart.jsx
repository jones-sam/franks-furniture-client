import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import StripePayment from "../components/StripePayment"

// Bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Modal from "react-modal"
import { FaShoppingCart } from "react-icons/fa"

// Stripe
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

Modal.setAppElement("#root")

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}
export class cart extends Component {
  state = {
    showModal: false,
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { items, totalCost } = this.props.data.cart
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
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={this.handleOpenModal}
                  >
                    <Modal isOpen={this.state.showModal} style={modalStyle}>
                      <Elements stripe={stripePromise}>
                        <StripePayment />
                      </Elements>
                    </Modal>
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
