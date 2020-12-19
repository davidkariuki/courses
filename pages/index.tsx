import {
  Typography,
  Container,
  makeStyles,
  createStyles,
} from "@material-ui/core"
import Head from "next/head"

import Layout from "../components/Layout"

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
    },
  })
)

export default function Home() {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" className={styles.container}>
        <Typography variant="h4">Home</Typography>
      </Container>
    </Layout>
  )
}
