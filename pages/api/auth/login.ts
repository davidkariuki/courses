import { Handler } from "next-iron-session"
import { User } from "../../../models/user"
import { validPassword } from "../../../utils/bcrypt"

import { connectDb, models } from "../../../utils/db"
import withSession from "../../../utils/withSession"

const handler: Handler = async (req, res) => {
  await connectDb()
  const { email, password } = req.body
  const user: User = await models.User.findOne({ email: email }).lean()

  if (!user) {
    return res
      .status(404)
      .json({ message: "An account with that email does not exist." })
  }

  if (validPassword(password, user.encryptedPassword)) {
    const { _id, name, email } = user
    req.session.set("user", { _id, name, email, isLoggedIn: true })
    await req.session.save()
    return res.status(200).json(user)
  } else {
    res.status(500).json({
      message: "Sign in failed. Check the details you provided are correct.",
    })
  }
}

export default withSession(handler)
