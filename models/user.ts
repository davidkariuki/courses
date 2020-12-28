import mongoose, { Schema, Document } from "mongoose"

export interface User extends Document {
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

const schema = new Schema(
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

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    delete ret._id
  },
})

export default mongoose.models.users || mongoose.model<User>("users", schema)
