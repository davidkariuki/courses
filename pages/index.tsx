import Head from "next/head"
import { NextPage } from "next"
import { Container } from "@material-ui/core"
import {
  withAuthUserTokenSSR,
  withAuthUser,
  AuthAction,
} from "next-firebase-auth"

import HomePage from "../components/HomePage"
import useStyles from "../styles"
import { Course } from "../models/course"

interface Props {
  courses: Course[]
}

const Home: NextPage<Props> = ({ courses }) => {
  const styles = useStyles()

  return (
    <>
      <Head>
        <title>Mastered</title>
      </Head>
      <Container maxWidth="md" className={styles.homeContainer}>
        <HomePage courses={courses} />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  // whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({}) => {
  const courses: Course[] = []

  return {
    props: { courses },
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home)
