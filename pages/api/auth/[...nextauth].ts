import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
//import bcrypt from "bcryptjs"

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
        const { email, password } = credentials
        const user = { id: 1, name: password, email: email }

        // get hash from User#encrypted_password
        // bcrypt.compareSync(password, hash)

        if (user) {
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
