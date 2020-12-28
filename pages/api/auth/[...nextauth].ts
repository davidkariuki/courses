import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { User } from "../../../models/user"
import { validPassword } from "../../../utils/bcrypt"

import { connectDb, models } from "../../../utils/db"

const options = {
  pages: {
    signIn: "/auth/sign_in",
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDb()

        const { email, password } = credentials
        const user: User = await models.User.findOne({ email: email })

        if (user && validPassword(password, user.encryptedPassword)) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      },
    }),
  ],
}

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
export default handler
