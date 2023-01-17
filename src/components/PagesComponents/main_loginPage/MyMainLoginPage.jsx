import React from 'react'
import classes from './MyMainLoginPage.module.scss'

import people_dark from "../../../assets/images/people-dark.png"
import people_light from "../../../assets/images/people-light.png"
import messages_dark from "../../../assets/images/messages-dark.png"
import messages_light from "../../../assets/images/messages-light.png"
import friends_dark from "../../../assets/images/friends-dark.png"
import friends_light from "../../../assets/images/friends-light.png"

import { signOut } from "firebase/auth"
import { Link } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import { useSelector } from 'react-redux'

export default function LoginPage({ ComponentCh }) {
  const { auth } = useFirebase()
  const theme = useSelector(state => state.theme.theme)

  return (
    <main className={classes.main}>
      <div className={classes.logOutButton}>
        <a
          onClick={() => {
            signOut(auth)
          }}
          className={classes.main_loginPage_exit}
        >
          Log out
        </a>
      </div>

      <div className={classes.main_div_loginPage}>
        <div
          action=""
          className={classes.main_div_loginPage_form}
        >
          <div className={classes.main_div_loginPage_form_mainDiv}>
            <aside className={classes.main_div_loginPage_form_mainDiv_sidebar}>
              <ul className={classes.main_div_loginPage_form_mainDiv_sidebar_ul}>
                <li className={classes.main_div_loginPage_form_mainDiv_sidebar_ul_li}>
                  <Link to={`/profile`}>
                    <div><img src={eval(`people_${theme}`)} alt="profile" /></div>
                    <p>Profile</p>
                  </Link>
                </li>
                <li className={classes.main_div_loginPage_form_mainDiv_sidebar_ul_li}>
                  <Link to={`/messages`}>
                    <div><img src={eval(`messages_${theme}`)} alt="messages" /></div>
                    <p>Messages</p>
                  </Link>
                </li>
                <li className={classes.main_div_loginPage_form_mainDiv_sidebar_ul_li}>
                  <Link to={`/friends`}>
                    <div><img src={eval(`friends_${theme}`)} alt="friends" /></div>
                    <p>Friends</p>
                  </Link>
                </li>
              </ul>
            </aside>

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
