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

export default mongoose.models.User || mongoose.model("User", schema)
