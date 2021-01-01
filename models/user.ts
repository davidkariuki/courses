import { Schema, Document, model, models } from "mongoose"

export interface User {
  id: string
  email: string
  name: string
  encryptedPassword: string
  resetPasswordToken?: string
  social_data: {
    twitterHandle?: string
    websiteUrl?: string
    youtubeUrl?: string
  }
  expert: boolean
  instructor: boolean
}

const UserSchema = new Schema(
  {
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

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    delete ret._id
  },
})

export type UserDocument = User & Document

export default models.users || model<UserDocument>("users", UserSchema)
