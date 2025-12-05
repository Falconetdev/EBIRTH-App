

// Firebase client initialization
import { initializeApp } from 'firebase/app'
// Avoid pulling analytics into the initial chunk; load it dynamically when supported
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Using provided config. Consider moving to Vite env variables for production.

  const firebaseConfig = {
  apiKey: "AIzaSyD10CQuuqrvoOBEeak4fejOSzu0C67_jhI",
  authDomain: "ebirth-landingpage.firebaseapp.com",
  projectId: "ebirth-landingpage",
  storageBucket: "ebirth-landingpage.firebasestorage.app",
  messagingSenderId: "551833814806",
  appId: "1:551833814806:web:734003bf3541b0fc18b237",
  measurementId: "G-59B7PLF0L9"
};


export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Analytics only in the browser and when supported
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ isSupported, getAnalytics }) => {
    isSupported().then((ok) => {
      if (ok) {
        try { getAnalytics(app) } catch {}
      }
    })
  }).catch(() => {})
}

