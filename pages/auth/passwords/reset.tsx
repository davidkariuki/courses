import { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import Layout from "../../../components/Layout"
import EmailForm, { Values } from "../../../components/EmailForm"
import useStyles from "../../../styles"

const ResetPassword: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [error, setError] = useState<string>()

  const onSubmit = async (values: Values) => {
    const response = await fetch("/api/auth/passwords", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(values),
    })
    if (response.ok) {
      router.push({
        pathname: "/auth/sign_in",
        query: { success: "emailSent" },
      })
    } else {
      const { message } = await response.json()
      setError(message)
    }
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
        <EmailForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default ResetPassword
