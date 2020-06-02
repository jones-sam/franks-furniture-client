import * as firebase from "firebase"

import firebaseConfig from "./firebaseConfig"

// Initialize Firebase
export const myFirebase = firebase.initializeApp(firebaseConfig)
myFirebase.analytics()

const baseDb = myFirebase.firestore()
export const db = baseDb
