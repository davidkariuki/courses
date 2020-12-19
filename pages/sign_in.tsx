import Head from "next/head"
import { FC } from "react"
import { createStyles, makeStyles, Container, Theme } from "@material-ui/core"

import Layout from "../components/Layout"
import LoginForm from "../components/LoginForm"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: "100%",
      display: "flex",
      justifyItems: "center",
      alignItems: "center",
      flexDirection: "column",
      "& > *": {
        margin: theme.spacing(2),
        width: "100%",
      },
    },
  })
)

const SignIn: FC = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        <LoginForm className={classes.form} />
      </Container>
    </Layout>
  )
}

export default SignIn
