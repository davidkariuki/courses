import Head from "next/head"
import { FC } from "react"
import { createStyles, makeStyles, Container, Theme } from "@material-ui/core"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"

import Layout from "../../components/Layout"
import LoginForm from "../../components/LoginForm"

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
  const [session] = useSession()
  const router = useRouter()

  if (session) {
    router.push("/")
  }

  return (
    <Layout>
      <Head>
        <title>Mastered | Sign In</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        {!session && (
          <>
            <LoginForm className={classes.form} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default SignIn
