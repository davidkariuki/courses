import { NextApiHandler } from "next"

const handler: NextApiHandler = async (_req, res) => {
  const user = true

  if (!user) {
    return res
      .status(404)
      .json({ message: "An account with that email does not exist." })
  }

  if (true) {
    return res.status(200).json(user)
  } else {
    res.status(500).json({
      message: "Sign in failed. Check the details you provided are correct.",
    })
  }
}

export default handler
