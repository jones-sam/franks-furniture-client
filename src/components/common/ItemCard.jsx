import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"

export class ItemCard extends Component {
  render() {
    const { hit } = this.props
    return (
      <Card className="align-self-center">
        <Link to={`/items/${hit.objectID}`}>
          <Card.Img
            variant="top"
            src={hit.itemImage}
            height="200"
            // width="250"
          />
          <Card.Body>
            <Card.Title>{hit.name}</Card.Title>
            <Card.Text>${hit.price}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    )
  }
}

export default ItemCard
