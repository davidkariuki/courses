import { Schema, Document, model, models, Types } from "mongoose"
import { Course } from "./course"

export interface User {
  _id: string
  userId?: number
  email: string
  name: string
  encryptedPassword: string
  resetPasswordToken?: string
  socialData: {
    twitterHandle?: string
    websiteUrl?: string
    youtubeUrl?: string
  }
  expert: boolean
  instructor: boolean
  courses: Course[]
}

const UserSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    userId: { type: Number },
    email: { type: String, required: true },
    name: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    resetPasswordToken: { type: String, index: true },
    socialData: {
      twitterHandle: String,
      websiteUrl: String,
      youtubeUrl: String,
    },
    expert: { Boolean, default: false },
    instructor: { type: Boolean, default: false },
    courses: [{ type: Types.ObjectId, ref: "courses" }],
  },
  { timestamps: true }
)

export type UserDocument = User & Document

export default models.users || model<UserDocument>("users", UserSchema)
