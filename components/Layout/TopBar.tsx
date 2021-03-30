import React, { FC, useState, MouseEvent, useContext } from "react"
import Link from "next/link"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { Container } from "@material-ui/core"
import { useRouter } from "next/router"
import { UserContext } from "../../lib/context"

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      padding: 0,
    },
    grow: {
      flexGrow: 1,
    },
    logoImage: {
      height: "2rem",
    },
  })
)

const TopBar: FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user } = useContext(UserContext)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSignOutClick = async (_e: MouseEvent) => {
    setAnchorEl(null)
    router.push("/auth/sign_in")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img className={classes.logoImage} src="/logo.svg" alt="Logo" />
            </IconButton>
          </Link>
          <div className={classes.grow} />
          {user && (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                edge="end"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={onSignOutClick}>Sign out</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
