import { GetServerSideProps } from "next"
import { FC } from "react"
import withSession from "../../utils/withSession"
import { models, connectDb } from "../../utils/db"
import { Course } from "../../models/course"

const Courses: FC = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (req, _res) => {
    connectDb()
    const user = req.session.get("user")
    const { _id } = req.params
    console.log(_id)

    const course: Course = await models.Course.find({ _id }).lean()

    if (!user) {
      return {
        props: {},
        redirect: {
          destination: "/auth/sign_in",
          permanent: false,
        },
      }
    }

    return { props: { user, course } }
  },
)
export default Courses
