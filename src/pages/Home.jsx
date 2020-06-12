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
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
} from "react-instantsearch-dom"

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
)
const itemIndex = client.initIndex("items")
let itemHits = []
class home extends Component {
  state = {
    searchQuery: "",
  }

  componentDidMount() {
    this.props.getItems()
    itemHits = this.props.data.items
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(`Submitted Search "${this.state.searchQuery}"`)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log(`searchQuery: ${this.state.searchQuery}`)
      itemIndex.search(this.state.searchQuery).then((res) => {
        itemHits = res.hits
        console.log(res.hits)
      })
    })
  }

  render() {
    const { items, loading } = this.props.data

    // const listOfItems = !loading
    //   ? items.map((item, index) => (
    //       <Col key={`item${index}`} lg={4} className="mb-4">
    //         <ItemCard item={item} />
    //       </Col>
    //     ))
    //   : null

    return (
      <Container>
        {/* <Row className="mb-2">
          <h1>Frank's Furniture - The Best in Town</h1>
        </Row> */}
        <InstantSearch searchClient={client} indexName="items" refresh>
          <Row>
            <SearchBox className="w-100 mb-3" />
          </Row>
          <Hits hitComponent={ItemCard} />
        </InstantSearch>
        {/* <Form
            className="w-100 mb-5 d-flex justify-content-center"
            onSubmit={this.handleSubmit}
          >
            <Form.Control
              onChange={this.handleChange}
              name="searchQuery"
              size="lg"
              type="text"
              placeholder="Search"
              className="w-75"
            />
          </Form> */}
        {/* <Row>{listOfItems}</Row> */}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = { getItems }

export default connect(mapStateToProps, mapDispatchToProps)(home)
