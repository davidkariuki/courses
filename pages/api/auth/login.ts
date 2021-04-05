import { NextApiHandler } from "next"
import { useState } from "react"
import { User } from "../../../models/user"

const handler: NextApiHandler = async (_req, res) => {
  const [user] = useState<User>()

  if (!user) {
    return res
      .status(404)
      .json({ message: "An account with that email does not exist." })
  }

  if (user) {
    return res.status(200).json(user)
  } else {
    res.status(500).json({
      message: "Sign in failed. Check the details you provided are correct.",
    })
  }
}

export default handler
