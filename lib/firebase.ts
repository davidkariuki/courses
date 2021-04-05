import admin from "firebase-admin"
import firebase from "firebase/app"
import "firebase/auth"

const serviceAccount = require(process.env.FIREBASE_PRIVATE_KEY as string)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyADSCRRKDSo1JYfYD9pVZd83ASP8N0cUvs",
    authDomain: "courses-686d0.firebaseapp.com",
    projectId: "courses-686d0",
    storageBucket: "courses-686d0.appspot.com",
    messagingSenderId: "257897652422",
    appId: "1:257897652422:web:4eadf7854f82f7952b37c7",
    measurementId: "G-1471PTCN33"
  })
}

export { admin, firebase }
