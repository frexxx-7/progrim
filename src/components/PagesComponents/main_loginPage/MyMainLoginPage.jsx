import React from 'react'
import classes from './MyMainLoginPage.module.scss'

import { signOut } from "firebase/auth"
import useFirebase from '../../../hooks/useFirebase'
import { useEffect } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'

export default function LoginPage({ ComponentCh }) {
  const { auth } = useFirebase()

  const onResize = (e) => {
    const logOut = document.getElementById('logOut')
    if (window.innerWidth >= 680)
      logOut.textContent = 'Log out'
    else
      logOut.innerHTML = '<'
  }

  useEffect(() => {
    window.addEventListener('resize', (e) => onResize(e))
    if (window.innerWidth >= 680)
      logOut.textContent = 'Log out'
    else
      logOut.innerHTML = '<'
  })

  return (
    <main className={classes.main}>
      <div className={classes.logOutButton}>
        <a
          onClick={() => {
            signOut(auth)
          }}
          className={classes.main_loginPage_exit}
          id='logOut'
        >
        </a>
      </div>

      <div className={classes.main_div_loginPage}>
        <div
          action=""
          className={classes.main_div_loginPage_form}
        >
          <div className={classes.main_div_loginPage_form_mainDiv}>
            <Sidebar />

            <div className={classes.main_div_loginPage_form_mainDiv_content}>
              <div className={classes.main_div_loginPage_form_mainDiv_content_div}>
                {ComponentCh}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
