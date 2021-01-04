import type { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { sendResetPasswordEmail } from "../../../utils/mail"
import { connectDb, models } from "../../../utils/db"
import { generateHash } from "../../../utils/bcrypt"
import { User } from "../../../models/user"

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
        return res
          .status(400)
          .json({ message: `Could not find user with email ${email}` })
      }

      const opts = {
        to: email,
        name: user.name,
        url: `${process.env.NEXT_PUBLIC_WEB_URI}/auth/passwords/${resetPasswordToken}`,
      }

      const sent = await sendResetPasswordEmail(opts)

      return res
        .status(200)
        .json({ message: sent ? "Email sent" : "Email failed" })
    }
    case "PATCH": {
      connectDb()
      const encryptedPassword = generateHash(password)

      const user: User = await models.User.findOneAndUpdate(
        { resetPasswordToken: token },
        { encryptedPassword, resetPasswordToken: null },
        { new: true }
      )

      if (user) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" })
      } else {
        return res.status(400).json({ message: "Error updating password" })
      }
    }
    default: {
      return res.status(405).json({ message: `Method ${method} not allowed` })
    }
  }
}

export default handler
