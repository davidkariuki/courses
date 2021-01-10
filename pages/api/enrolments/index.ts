import { Handler } from "next-iron-session"

import { connectDb, models } from "../../../utils/db"
import withSession from "../../../utils/withSession"

const handler: Handler = async (req, res) => {
  const { method, session } = req

  switch (method) {
    case "GET": {
      connectDb()
      const sessionUser = session.get("user")
      const enrolments = await models.Enrolment.find({
        user: sessionUser._id,
      })
        .populate("course")
        .lean()

      return res.status(200).json(enrolments)
    }
  }
}

export default withSession(handler)
