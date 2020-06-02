import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import { Link } from "react-router-dom"

export class ItemCard extends Component {
  render() {
    const { item } = this.props
    return (
      <Card className="align-self-center">
        <Link to={`/items/${item.itemId}`}>
          <Card.Img
            variant="top"
            src={item.itemImage}
            height="200"
            // width="250"
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>${item.price}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    )
  }
}

export default ItemCard
