import React, { useState, useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"

// Bootstrap
import Button from "react-bootstrap/Button"

// Icons
import { FaLock } from "react-icons/fa"

// Stripe
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

function StripePayment(props) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()

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
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.name.value,
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
    }

    console.log("Submitted")
  }
  return (
    <>
      <div id="stripe-payment">
        <h3>Frank's Furniture</h3>
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <Button
            type="submit"
            id="submit"
            disabled={processing || disabled || succeeded}
            variant="outline-success"
          >
            <FaLock />
            Pay
          </Button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StripePayment)
