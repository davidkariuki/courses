import mongoose from "mongoose"
import User from "../models/user"
import Course from "../models/course"
import Enrolment from "../models/enrolment"

const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return

  return mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

const models = { User, Course, Enrolment }

export { connectDb, models }
