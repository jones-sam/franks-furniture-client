import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { clearCart } from "../redux/actions/dataActions"

// Bootstrap
import Button from "react-bootstrap/Button"

// Icons
import { FaLock } from "react-icons/fa"

// Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

function StripePayment(props) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  console.log(props)

  useEffect(() => {
    console.log(props.data.cart.items)
    axios
      .post("/create-payment-intent", {
        items: props.data.cart.items,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => console.error(err))
  }, [])

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      shipping: {
        address: {
          line1: address,
        },
        name: fullName,
      },
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: fullName,
          email: email,
          address: address,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      props.clearCart()
    }
  }
  return (
    <>
      <div id="stripe-payment">
        <form id="payment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
          />
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            className="mb-3"
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Shipping address"
          />
          <CardElement
            locale="ca"
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <Button
            type="submit"
            id="submit"
            disabled={
              processing ||
              disabled ||
              succeeded ||
              !fullName ||
              !email ||
              !address
            }
            variant="outline-success"
          >
            <FaLock />
            {` Pay $${props.data.cart.totalCost.toFixed(2)}`}
          </Button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment Succeeded! An email has been sent for confirmation
          </p>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = { clearCart }

export default connect(mapStateToProps, mapDispatchToProps)(StripePayment)
