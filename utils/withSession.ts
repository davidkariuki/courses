// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` function
import { Handler, withIronSession } from "next-iron-session"

export default function withSession(handler: Handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "courses.mastered.com",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
}
