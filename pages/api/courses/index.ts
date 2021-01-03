import type { NextApiRequest, NextApiResponse } from "next"

import { connectDb, models } from "../../../utils/db"
import { Course } from "../../../models/course"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      connectDb()

      const courses: Course[] = await models.Course.find({})

      if (!courses) {
        return res.status(400).end("Error getting courses")
      }

      return res.status(200).json(courses)
    }
  }
}

export default handler
