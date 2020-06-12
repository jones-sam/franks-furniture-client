import React, { Component } from "react"
import ItemCard from "../components/common/ItemCard"

//bootstrap
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

// redux
import { connect } from "react-redux"
import { getItems } from "../redux/actions/dataActions"

// Algolia
import algoliasearch from "algoliasearch"
import { InstantSearch, SearchBox, Hits, Stats } from "react-instantsearch-dom"

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
)

class home extends Component {
  state = {
    searchQuery: "",
  }

  componentDidMount() {
    this.props.getItems()
  }

  render() {
    return (
      <Container>
        <Row className="mb-2">
          <h1>Frank's Furniture - The Best in Town</h1>
        </Row>
        <InstantSearch searchClient={client} indexName="items" refresh>
          <Row>
            <SearchBox className="w-100 mb-3" />
          </Row>
          <Hits hitComponent={ItemCard} />
        </InstantSearch>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = { getItems }

export default connect(mapStateToProps, mapDispatchToProps)(home)
