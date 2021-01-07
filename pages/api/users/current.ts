import { Handler } from "next-iron-session"
import withSession from "../../../utils/session"

import { connectDb, models } from "../../../utils/db"
import { User } from "../../../models/user"

const handler: Handler = async (req, res) => {
  const { method, session } = req

  switch (method) {
    case "GET": {
      connectDb()
      const user = session.get("user")

      if (!user) {
        return res.status(401).json({ message: "Unauthorised" })
      }

      const currentUser: User = await models.User.findOne({ _id: user?._id })

      if (currentUser) {
        return res.status(200).json(user)
      }

      return res.status(404).json({ message: "Error fetching user" })
    }
  }
}

export default withSession(handler)
