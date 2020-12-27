import mongoose from "mongoose"

const schema = new mongoose.Schema(
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

export default mongoose.models.users || mongoose.model("users", schema)
