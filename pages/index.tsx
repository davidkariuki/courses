import { FC } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Container } from "@material-ui/core"

import Layout from "../components/Layout"
import HomePage from "../components/HomePage"
import useStyles from "../styles"

const Home: FC = () => {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>Mastered</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" className={styles.homeContainer}>
        <HomePage />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/auth/sign_in",
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}

export default Home
