import Head from "next/head"
import { NextPage } from "next"
import { Container } from "@material-ui/core"

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

export const getServerSideProps = async () => {
  const courses: Course[] = []

  return {
    props: { courses },
  }
}

export default Home
