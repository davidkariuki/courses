import mongoose from "mongoose"
import User from "../models/user"
import Course from "../models/course"
import CoursePart from "../models/course_part"
import CourseModule from "../models/course_module"
import Enrolment from "../models/enrolment"

const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return

  return mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

const models = { User, Enrolment, Course, CoursePart, CourseModule }

export { connectDb, models }
