import mongoose from "mongoose"
import User from "../models/user"
import Course from "../models/course"

const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return

  return mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const models = { User, Course }

export { connectDb, models }
