import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyADSCRRKDSo1JYfYD9pVZd83ASP8N0cUvs",
  authDomain: "courses-686d0.firebaseapp.com",
  projectId: "courses-686d0",
  storageBucket: "courses-686d0.appspot.com",
  messagingSenderId: "257897652422",
  appId: "1:257897652422:web:4eadf7854f82f7952b37c7",
  measurementId: "G-1471PTCN33",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
