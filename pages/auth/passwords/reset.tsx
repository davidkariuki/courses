import { useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { getSession, Session } from "next-auth/client"
import { Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import Layout from "../../../components/Layout"
import EmailForm, { Values } from "../../../components/EmailForm"
import useStyles from "../../../styles"

interface ResetPasswordProps {
  session: Session
}

const ResetPassword: NextPage<ResetPasswordProps> = ({ session }) => {
  const classes = useStyles()
  const router = useRouter()
  const [error, setError] = useState<string>()

  const onSubmit = (values: Values) => {
    fetch("/api/auth/passwords", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status === 200) {
        router.push({
          pathname: "/auth/sign_in",
          query: { success: "emailSent" },
        })
      } else {
        setError("Sending reset password instructions failed.")
      }
    })
  }

  return (
    <Layout>
      <Head>
        <title>Mastered | Reset Password</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        {!session && <EmailForm onSubmit={onSubmit} />}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default ResetPassword
