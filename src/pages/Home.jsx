import React, { Component } from "react"
import { connect } from "react-redux"

//bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

class home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <h1>Frank's Furniture - The Best in Town</h1>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(home)
