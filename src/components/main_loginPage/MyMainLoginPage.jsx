import React from 'react'
import classes from './MyMainLoginPage.module.scss'
import people from "../../assets/images/people.png"
import message from "../../assets/images/message.png"
import friends from "../../assets/images/friends.png"
import { signOut } from "firebase/auth"
import { Link } from 'react-router-dom'
import useFirebase from '../../hooks/useFirebase'

export default function LoginPage({ComponentCh}) {
  const {auth} = useFirebase()

  return (
    <main className={classes.main}>
      <div className={classes.logOutButton}>
        <a
          onClick={() => {
            signOut(auth)
            localStorage.clear()
            location.reload()
          }}
          className={classes.main_loginPage_exit
          }
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
                    <div><img src={people} alt="profile" /></div>
                    <p>Profile</p>
                  </Link>
                </li>
                <li className={classes.main_div_loginPage_form_mainDiv_sidebar_ul_li}>
                  <Link to={`/messages`}>
                    <div><img src={message} alt="messages" /></div>
                    <p>Messages</p>
                  </Link>
                </li>
                <li className={classes.main_div_loginPage_form_mainDiv_sidebar_ul_li}>
                  <Link to={`/friends`}>
                    <div><img src={friends} alt="friends" /></div>
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
