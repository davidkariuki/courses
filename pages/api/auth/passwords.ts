// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { email },
    method,
  } = req

  if (method === "POST") {
    res.statusCode = 200
    res.json({ email })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${method} not allowed`)
  }
}
