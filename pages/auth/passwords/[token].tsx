import { FC } from "react"
import Head from "next/head"
import { Button, Box, Container } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import type { GetServerSideProps } from "next"
import Link from "next/link"

import Layout from "../../../components/Layout"
import PasswordForm from "../../../components/PasswordForm"
import useStyles from "../../../styles"
import { connectDb, models } from "../../../utils/db"
import { User as TUser } from "../../../types"

interface Props {
  user: TUser
}

const Password: FC<Props> = ({ user }) => {
  const classes = useStyles()
  const renderContent = () => {
    if (user) {
      return <PasswordForm />
    } else {
      return (
        <Box className={classes.form}>
          <Alert severity="error">
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
  const user = await models.User.findOne({ reset_password_token: token })

  return {
    props: { user },
  }
}

export default Password
