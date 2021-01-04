import type { NextApiRequest, NextApiResponse } from "next"

import { connectDb, models } from "../../../utils/db"
import { User } from "../../../models/user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id: _id },
  } = req

  switch (method) {
    case "GET": {
      connectDb()

      const user: User = await models.User.findOne({ _id })

      if (user) {
        return res.status(200).json(user)
      }

      return res.status(404).end("Error getting user")
    }
  }
}

export default handler
