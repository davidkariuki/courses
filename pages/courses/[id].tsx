import { GetServerSideProps } from "next"
import React, { FC } from "react"
import { Container, Typography } from "@material-ui/core"
import Head from "next/head"

import withSession from "../../utils/withSession"
import { models, connectDb } from "../../utils/db"
import { Course } from "../../models/course"
import { User } from "../../models/user"
import Layout from "../../components/Layout"
import TopBar from "../../components/Layout/TopBar"
import useStyles from "../../styles"

interface Props {
  user: User
  course: Course
}

const CourseOverview: FC<Props> = ({ user, course }) => {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>{course.title}</title>
      </Head>

      <TopBar user={user} />
      <Container maxWidth="md" className={styles.homeContainer}>
        <Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
          aspernatur sint, voluptates corrupti soluta natus sed libero quisquam
          maiores dolores voluptate architecto laborum dolor magni animi, ut
          inventore facilis adipisci.
        </Typography>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, params }) => {
    connectDb()
    const user = req.session.get("user")
    const { id: _id } = params

    const course: Course = await models.Course.findOne({ _id }).lean()

    if (!user) {
      return {
        props: {},
        redirect: {
          destination: "/auth/sign_in",
          permanent: false,
        },
      }
    }

    return {
      props: { user, course: { ...course, _id: course._id.toString() } },
    }
  },
)
export default CourseOverview
