import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import MyFooter from './components/UI/footer/MyFooter'
import MyHeader from "./components/UI/header/MyHeader"
import Loader from './components/UI/Loader'
import useFirebase from './hooks/useFirebase'

function App() {
  const { auth } = useFirebase()
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <div className='app_bg'>
        <MyHeader />
        <Loader />
        <MyFooter />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className='app_bg'>
        <MyHeader />
        <AppRouter />
        <MyFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
