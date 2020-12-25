import type { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { sendResetPasswordEmail } from "../../../utils/mail"
import { connectDb, models } from "../../../utils/db"
import { User } from "../../../types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, password, token },
    method,
  } = req

  switch (method) {
    case "POST": {
      connectDb()
      const resetPasswordToken = uuidv4()
      const user: User = await models.User.findOneAndUpdate(
        { email },
        { resetPasswordToken },
        { new: true }
      )

      if (!user) {
        return res.status(400).end(`Could not find user with email ${email}`)
      }

      const opts = {
        to: email,
        name: user.name,
        url: `${process.env.NEXT_PUBLIC_WEB_URI}/auth/passwords/${resetPasswordToken}`,
      }

      const sent = await sendResetPasswordEmail(opts)

      res.setHeader("Content-Type", "application/json")
      res.status(200).json({ sent })
    }
    case "PATCH": {
      connectDb()
      const user: User = await models.User.updateOne(
        { resetPasswordToken: token },
        { password: password },
        { new: true }
      )

      if (user) {
        res.status(200).json({ success: true })
      } else {
        res.status(400).end(`Error updating password`)
      }
    }
    default: {
      res.setHeader("Allow", ["POST", "PATCH"])
      res.status(405).end(`Method ${method} not allowed`)
    }
  }
}

export default handler
