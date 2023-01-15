import React, { createContext, useMemo, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import useUser from '../hooks/useUser';

const firebaseConfig = {
  apiKey: "AIzaSyCMaYLvzgGSK1gRxhuRjiP6gH0k1Dx9MpU",
  authDomain: "progrim-app.firebaseapp.com",
  projectId: "progrim-app",
  messagingSenderId: "1090627444543",
  appId: "1:1090627444543:web:d7bd9a83456be1f01ebd8a",
  measurementId: "G-2MZ0FWH5KW",
  databaseURL: 'https://progrim-app-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'gs://progrim-app.appspot.com'
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const database = getDatabase(app)
const storage = getStorage(app)

export const FirebaseContext = createContext('')

const FirebaseProvider = ({ children }) => {
  const loadUser = () => {
    const [user, loading, error] = useAuthState(auth)
    return [user, loading, error]
  }

  const value = useMemo(() => ({
    auth,
    database,
    storage,
    loadUser,
  }), [])

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider