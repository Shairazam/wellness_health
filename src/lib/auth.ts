// This is a simplified auth implementation
// In a production app, you would use a proper auth provider like NextAuth.js or Clerk

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { firebaseApp } from "./firebase"
// import { initializeApp, getApps } from "firebase/app"

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return !!userCredential.user
  } catch (error) {
    console.error("Error signing in:", error)
    return false
  }
}

export async function signUp(name: string, email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toISOString(),
      subscription: null,
    })

    return true
  } catch (error) {
    console.error("Error signing up:", error)
    return false
  }
}

export async function signOutUser(): Promise<boolean> {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error("Error signing out:", error)
    return false
  }
}

export async function checkAuth(): Promise<boolean> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(!!user)
    })
  })
}

export async function getCurrentUser() {
  const user = auth.currentUser
  if (!user) return null

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      return {
        uid: user.uid,
        email: user.email,
        ...userDoc.data(),
      }
    }
    return null
  } catch (error) {
    console.error("Error getting user data:", error)
    return null
  }
}
