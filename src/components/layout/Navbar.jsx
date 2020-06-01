import React, { Component } from "react"

// MUI
import { Typography, AppBar, Toolbar } from "@material-ui/core"

export class Navbar extends Component {
  render() {
    return (
      <>
        <AppBar>
          <Toolbar>
            <Typography variant="h5">Frank's Furniture</Typography>
          </Toolbar>
        </AppBar>
      </>
    )
  }
}

export default Navbar
