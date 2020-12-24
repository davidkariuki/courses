import { FC } from "react"
import Head from "next/head"
//import { useSession } from "next-auth/client"
//import { useRouter } from "next/router"
import { Container } from "@material-ui/core"

import Layout from "../../../components/Layout"
import PasswordForm from "../../../components/PasswordForm"
import useStyles from "../../../styles"

const Password: FC = () => {
  const classes = useStyles()
  //const [session] = useSession()
  //const router = useRouter()

  //if (session) {
  //router.push("/")
  //}

  return (
    <Layout>
      <Head>
        <title>Mastered | Reset Password</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        <PasswordForm />
      </Container>
    </Layout>
  )
}

export default Password
