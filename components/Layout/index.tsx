import { FC } from "react"
import { Grid, Box } from "@material-ui/core"

import TopBar from "./TopBar"
import Footer from "./Footer"
import { User } from "../../models/user"

interface Props {
  user: User
}

const Layout: FC<Props> = ({ user, children }) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <TopBar user={user} />
            {children}
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout
