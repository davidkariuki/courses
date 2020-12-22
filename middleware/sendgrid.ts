import mail from "@sendgrid/mail"

mail.setApiKey(process.env.SENDGRID_API_KEY!)

interface ResetPasswordOpts {
  to: string
  html: string
}

export const sendResetPasswordEmail = async (opts: ResetPasswordOpts) => {
  const mailOpts = {
    ...opts,
    from: "tech@mastered.com",
    subject: "Reset your password",
  }

  return mail
    .send(mailOpts)
    .then(() => {
      return true
    })
    .catch((error) => {
      console.log("error: ", error)
      return false
    })
}
