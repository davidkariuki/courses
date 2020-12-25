import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import { Typography, Container } from "@material-ui/core"

import Layout from "../components/Layout"
import useStyles from "../styles"
//import { GetServerSideProps } from "next"

export default function Home() {
  const styles = useStyles()
  const router = useRouter()
  const [session, loading] = useSession()

  if (loading) {
    return <></>
  }

  if (!loading && !session) {
    router.push("/auth/sign_in")
  }

  return (
    <Layout>
      <Head>
        <title>Mastered</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" className={styles.homeContainer}>
        <Typography variant="h3">Home</Typography>
      </Container>
    </Layout>
  )
}
