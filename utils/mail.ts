import mail from "@sendgrid/mail"

mail.setApiKey(process.env.SENDGRID_API_KEY!)

interface MailOpts {
  to: string
  name: string
  url: string
}

export const sendResetPasswordEmail = async (opts: MailOpts) => {
  const { to, name, url } = opts

  const mailOpts = {
    to,
    from: process.env.SENDGRID_DEFAULT_SENDER as string,
    templateId: process.env.RESET_PWD_EMAIL_TEMPLATE_ID as string,
    dynamicTemplateData: { name, url },
  }

  return mail
    .send(mailOpts)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
