import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button, Box, Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import type { GetServerSideProps, NextPage } from "next"

import Layout from "../../../components/Layout"
import PasswordForm, { Values } from "../../../components/PasswordForm"
import useStyles from "../../../styles"
import { connectDb, models } from "../../../utils/db"
import { User } from "../../../types"

interface Props {
  user: User
  token: string
}

const Password: NextPage<Props> = ({ user, token }) => {
  const router = useRouter()
  const classes = useStyles()

  const onSubmit = async (values: Values) => {
    const res = await fetch("/api/auth/passwords", {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({
        password: values.password,
        token,
      }),
    })

    if (res.status === 200) {
      router.push({
        pathname: "/auth/sign_in",
        query: { success: "passwordChanged" },
      })
    }
  }

  const renderContent = () => {
    if (user) {
      return <PasswordForm onSubmit={onSubmit} />
    } else {
      return (
        <Box className={classes.form}>
          <Alert variant="filled" severity="error">
            The password reset link might have expired. You can request a new
            link below
          </Alert>
          <Link href="/auth/passwords/reset" passHref>
            <Button variant="contained" color="secondary">
              Reset your password
            </Button>
          </Link>
        </Box>
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mastered | Change Password</title>
      </Head>

      <Container maxWidth="sm" className={classes.container}>
        {renderContent()}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { token },
  } = context
  await connectDb()
  const user: User = await models.users
    .findOne({ resetPasswordToken: token })
    .lean()

  if (user) {
    return {
      props: { token, user: JSON.stringify(user) },
    }
  } else {
    return { props: {} }
  }
}

export default Password
