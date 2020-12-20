import { FC } from "react"
import { Grid, Box } from "@material-ui/core"

import TopBar from "./TopBar"
import Footer from "./Footer"

const Layout: FC = ({ children }) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <TopBar />
            {children}
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
