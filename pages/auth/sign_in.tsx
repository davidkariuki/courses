import Head from "next/head"
import { NextPage } from "next"
import { Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import Layout from "../../components/Layout"
import LoginForm, { Values } from "../../components/LoginForm"
import useStyles from "../../styles"
import { useState } from "react"
import { useRouter } from "next/router"

const SignIn: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { success, error } = router.query
  const [errorMsg, setErrorMsg] = useState<string>(error as string)
  const [successMsg] = useState<string>(success as string)

  const onSubmit = async (values: Values) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      router.push("/")
    } else {
      const { message } = await response.json()
      setErrorMsg(message)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mastered | Sign In</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        {errorMsg && (
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert variant="filled" severity="success">
            {successMessage(successMsg)}
          </Alert>
        )}
        <LoginForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

const successMessage = (key: string): string => {
  switch (key) {
    case "passwordChanged":
      return "Password changed successfully"
    case "emailSent":
      return "Reset password email sent successfully"
    default:
      return ""
  }
}

export default SignIn
