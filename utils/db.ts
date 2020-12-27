import mongoose from "mongoose"
import users from "../models/User"

const connectDb = () => {
  if (mongoose.connection.readyState !== 0) return

  return mongoose.connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const models = { users }

export { connectDb, models }
