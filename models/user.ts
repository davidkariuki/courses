import { Schema, Document, model, models, Types } from "mongoose"

export interface User {
  _id: string
  userId?: string
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
}

const UserSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    userId: { type: String },
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
  },
  { timestamps: true }
)

export type UserDocument = User & Document

export default models.users || model<UserDocument>("users", UserSchema)
