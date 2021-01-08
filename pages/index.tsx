import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { Container } from "@material-ui/core"

import Layout from "../components/Layout"
import HomePage from "../components/HomePage"
import useStyles from "../styles"
import { models, connectDb } from "../utils/db"
import { Course } from "../models/course"
import withSession from "../utils/session"
import { User } from "../models/user"
import { Enrolment } from "../models/enrolment"
import TopBar from "../components/Layout/TopBar"

interface Props {
  courses: Course[]
  user: User
}

const Home: NextPage<Props> = ({ user, courses }) => {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>Mastered</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar user={user} />
      <Container maxWidth="md" className={styles.homeContainer}>
        <HomePage courses={courses} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req }) {
    connectDb()
    const user = req.session.get("user")

    if (!user) {
      return {
        props: {},
        redirect: {
          destination: "/auth/sign_in",
          permanent: false,
        },
      }
    }

    const result: Enrolment[] = await models.Enrolment.find({ user: user._id })
      .populate("course")
      .lean()

    const courses = result.map((e) => {
      const course = e.course
      return { ...course, _id: course._id.toString() }
    })

    return {
      props: { user, courses },
    }
  }
)

export default Home
