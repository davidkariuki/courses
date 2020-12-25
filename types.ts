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
