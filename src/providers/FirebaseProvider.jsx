import React, { createContext, useMemo } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  //
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
