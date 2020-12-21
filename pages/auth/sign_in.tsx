import { FC } from "react"
import Head from "next/head"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { Container } from "@material-ui/core"

import Layout from "../../components/Layout"
import LoginForm from "../../components/LoginForm"
import useStyles from "../../styles"

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
        {!session && <LoginForm />}
      </Container>
    </Layout>
  )
}

export default SignIn
