import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/client"
import { Container } from "@material-ui/core"

import Layout from "../components/Layout"
import HomePage from "../components/HomePage"
import useStyles from "../styles"
import { models, connectDb } from "../utils/db"
import { Course } from "../models/course"

interface Props {
  courses: Course[]
}

const Home: NextPage<Props> = ({ courses }) => {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>Mastered</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md" className={styles.homeContainer}>
        <HomePage courses={courses} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  connectDb()
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

  const result: Course[] = await models.Course.find({}).lean()

  const courses = result.map((c) => {
    return { ...c, _id: c._id.toString() }
  })

  return {
    props: { session, courses },
  }
}

export default Home
