import type { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import { sendResetPasswordEmail } from "../../../middleware/sendgrid"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email },
    method,
  } = req

  if (method === "POST") {
    const name = "Foo"
    const code = uuidv4()

    const opts = {
      to: email,
      name: name,
      url: `${process.env.NEXT_PUBLIC_HOST}/auth/passwords/${code}`,
    }

    const sent = await sendResetPasswordEmail(opts)

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ sent })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${method} not allowed`)
  }
}

export default handler
