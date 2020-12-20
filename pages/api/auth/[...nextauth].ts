import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"

const options = {
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
