import { GetServerSideProps } from "next"
import React, { FC } from "react"
import { Box, Container, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import Head from "next/head"

import withSession from "../../utils/withSession"
import { models, connectDb } from "../../utils/db"
import { Course } from "../../models/course"
import { User } from "../../models/user"
import Layout from "../../components/Layout"
import TopBar from "../../components/Layout/TopBar"
import useStyles from "../../styles"
import { Enrolment } from "../../models/enrolment"

interface Props {
  user: User
  course: Course
  authorised: boolean
}

const CourseOverview: FC<Props> = ({ authorised, user, course }) => {
  const styles = useStyles()

  return (
    <Layout>
      <Head>
        <title>{course.title}</title>
      </Head>

      <TopBar user={user} />
      <Container maxWidth="md" className={styles.homeContainer}>
        {!authorised && (
          <Box marginTop="2rem">
            <Alert severity="error" variant="filled">
              You do not have access to this course.
            </Alert>
          </Box>
        )}
        {authorised && (
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
            aspernatur sint, voluptates corrupti soluta natus sed libero
            quisquam maiores dolores voluptate architecto laborum dolor magni
            animi, ut inventore facilis adipisci.
          </Typography>
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req, params }) => {
    connectDb()
    const user = req.session.get("user")
    const { id: _id } = params

    if (!user) {
      return {
        props: {},
        redirect: {
          destination: "/auth/sign_in",
          permanent: false,
        },
      }
    }

    try {
      const course: Course = await models.Course.findOne({ _id }).lean()
      const enrolments: Enrolment[] = await models.Enrolment.find({
        user: user,
        course: course,
      }).lean()

      if (!course) throw Error

      return {
        props: {
          authorised: enrolments.length > 0,
          user,
          course: { ...course, _id: course._id.toString() },
        },
      }
    } catch {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      }
    }
  }
)

export default CourseOverview
