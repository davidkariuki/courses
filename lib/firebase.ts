import { init } from "next-firebase-auth"

const initAuth = () => {
  init({
    authPageURL: "/auth/sign_in",
    appPageURL: "/",
    loginAPIEndpoint: "/api/auth/login",
    logoutAPIEndpoint: "/api/auth/logout",
    firebaseClientInitConfig: {
      apiKey: "AIzaSyADSCRRKDSo1JYfYD9pVZd83ASP8N0cUvs",
      authDomain: "courses-686d0.firebaseapp.com",
      projectId: "courses-686d0",
    },
    cookies: {
      name: "courses.mastered.com",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "development" ? false : true,
      signed: true,
    },
  })
}

export default initAuth
