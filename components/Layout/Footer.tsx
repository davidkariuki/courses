import React, { FC } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

const Footer: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar></Toolbar>
    </AppBar>
  )
}

export default Footer
