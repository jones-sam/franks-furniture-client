import React, { Component } from "react"
import ItemCard from "../components/common/ItemCard"

//bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { connect } from "react-redux"
import { getItems } from "../redux/actions/dataActions"
class home extends Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    const { items, loading } = this.props.data

    const listOfItems = !loading
      ? items.map((item, index) => (
          <Col key={item.itemId} lg={4}>
            <ItemCard item={item} />
          </Col>
        ))
      : null

    return (
      <Container>
        <Row className="mb-5">
          <h1>Frank's Furniture - The Best in Town</h1>
        </Row>
        <Row>{listOfItems}</Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = { getItems }

export default connect(mapStateToProps, mapDispatchToProps)(home)
