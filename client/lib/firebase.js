

// Firebase client initialization
import { initializeApp } from 'firebase/app'
// Avoid pulling analytics into the initial chunk; load it dynamically when supported
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Using provided config. Consider moving to Vite env variables for production.

const firebaseConfig = {
  apiKey: "AIzaSyCvBARzonfwKRS6FKAIVMU_4yHAKREcVVY",
  authDomain: "ebirthblog.firebaseapp.com",
  projectId: "ebirthblog",
  storageBucket: "ebirthblog.firebasestorage.app",
  messagingSenderId: "398233080817",
  appId: "1:398233080817:web:470edb3701f6bad0df2a50"
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

