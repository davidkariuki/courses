import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import {
  Typography,
  Container,
  makeStyles,
  createStyles,
} from "@material-ui/core"

import Layout from "../components/Layout"
//import { GetServerSideProps } from "next"

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
    },
  })
)

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

      <Container maxWidth="xl" className={styles.container}>
        <Typography variant="h4">Home</Typography>
      </Container>
    </Layout>
  )
}
