import type { NextApiRequest, NextApiResponse } from "next"

import { sendResetPasswordEmail } from "../../../middleware/sendgrid"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, html },
    method,
  } = req

  if (method === "POST") {
    const sent = await sendResetPasswordEmail({
      to: email,
      html,
    })

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ sent })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${method} not allowed`)
  }
}

export default handler
