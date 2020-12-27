import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { getSession, csrfToken, Session, signIn } from "next-auth/client"
import { Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import Layout from "../../components/Layout"
import LoginForm, { Values } from "../../components/LoginForm"
import useStyles from "../../styles"

interface SignInProps {
  csrfToken: string
  session: Session
  error: string
  success: string
}

const SignIn: NextPage<SignInProps> = ({
  csrfToken,
  session,
  error,
  success,
}) => {
  const classes = useStyles()

  const onSubmit = (values: Values) => {
    signIn("credentials", { ...values, csrfToken })
  }

  return (
    <Layout>
      <Head>
        <title>Mastered | Sign In</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        {error && (
          <Alert variant="filled" severity="error">
            Sign in failed. Check the details you provided are correct.
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success">
            {successMessage(success)}
          </Alert>
        )}
        {!session && <LoginForm onSubmit={onSubmit} />}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const error = context.query.error || null
  const success = context.query.success || null

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
    props: { csrfToken: await csrfToken(context), session, error, success },
  }
}

export default SignIn
