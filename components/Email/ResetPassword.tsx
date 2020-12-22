import { FC } from "react"

interface Props {
  code: string
  name: string
}

const ResetPassword: FC<Props> = ({ code, name }) => {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link
          href="//cdn.muicss.com/mui-0.10.3/email/mui-email-styletag.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.muicss.com/mui-0.10.3/email/mui-email-inline.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <table
          className="mui-body"
          cellPadding="0"
          cellSpacing="0"
          style={{ border: 0 }}
        >
          <tr>
            <td>
              <p className="mui-text-title">
                <strong>Hello {name},</strong>
              </p>
              <div className="mui--text-title">
                We’ve received a request to reset your password. You can reset
                your password using the link below. Please note, it will expire
                within 24 hours.
              </div>
              <p className="mui--text-title">
                <a
                  href={`${process.env.NEXT_PUBLIC_HOST}/auth/passwords/${code}`}
                >
                  Click here to reset your password
                </a>
              </p>
              <p className="mui--text-title">
                If you didn’t make this request, feel free to disregard this
                email. Your password will remain the same.
              </p>
              <p className="mui--text-title">Sincerely,</p>
              <p className="mui--text-title">The Mastered Team</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}

export default ResetPassword
