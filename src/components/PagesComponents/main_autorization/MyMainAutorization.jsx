import React, { useState } from 'react'
import classes from './MyMainAutorization.module.scss'
import { Link } from 'react-router-dom'
import { ref as refSt, getDownloadURL } from 'firebase/storage'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { onValue, ref, update } from 'firebase/database'
import useFirebase from '../../../hooks/useFirebase'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'
import MyFooter from '../../UI/footer/MyFooter'

export default function MyMainAutorization() {
  const { auth, database, storage } = useFirebase()
  const theme = useSelector(state => state.theme.theme)

  const [hidePassword, setHidePassword] = useState(false)
  const [inputError, setInputError] = useState('')

  const typeText = hidePassword ? 'text' : 'password'

  const changeInput = (e) => {
    const inputPassword = document.querySelector('#password')
    inputPassword.focus()
    !hidePassword
      ?
      (
        e.target.setAttribute('src', `./eye2-${theme}.png`),
        setHidePassword(true)
      )
      :
      (
        e.target.setAttribute('src', `./eye-${theme}.png`),
        setHidePassword(false)
      )
  }

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        update(ref(database, 'users/' + user.uid + '/userData'), {
          id: user.uid,
        });
        const userData = ref(database, 'users/' + user.uid + '/userData');
        onValue(userData, async (snapshot) => {
          if (!snapshot.val().photo) {
            const storageRef = refSt(storage, `avatars/no-avatar.jpg`)
            getDownloadURL(storageRef)
              .then((url) => {
                update(ref(database, 'users/' + user.uid + '/userData'), {
                  photo: url,
                  date: user.metadata.creationTime,
                  name: user.displayName,
                  status: ''
                });
              })
          }
        });
        useUser(user)
      })
      .catch((error) => {
        setInputError(error.message)
      });
  }

  const emailAndPassword = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        useUser(user)
      })
      .catch((error) => {
        setInputError(error.message)
      });
  }


  return (
    <>
    <main className={classes.main}>
      <div className={classes.main_icon}>
        <div className={classes.main_icon_div}>
          <img src={`/icon-${theme}.png`} alt="Progrim" />
        </div>
      </div>
      <div className={classes.main_div_autorization}>
        <form
          action=""
          className={classes.main_div_autorization_form_autorization}
          onSubmit={(e) => { e.preventDefault() }}
        >
          <h2 className={classes.main_div_autorization_form_autorization_h2}>Autorization</h2>
          <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{inputError}</div>
          <div className={classes.formInputs}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className={classes.main_div_autorization_form_autorization_input_login}
              id='email'
            />
            <div className={classes.main_div_autorization_form_autorization_div}>
              <input
                type={typeText}
                name="password"
                placeholder="Password"
                autoComplete="off"
                className={classes.main_div_autorization_form_autorization_input_password}
                id='password'
              />
              <img
                src={`./eye-${theme}.png`}
                alt="eye"
                className={classes.main_div_autorization_form_autorization_div_img}
                onClick={(e) => changeInput(e)}
              />
            </div>

          </div>
          <button
            type="submit"
            name="signin"
            className={classes.main_div_autorization_form_autorization_button}
            onClick={emailAndPassword}
          >
            Log in
          </button>
          <div
            className={classes.main_div_autorization_form_autorization_socialNetworks}
          >
            <a onClick={googleLogin}><img src={`./google-${theme}.png`} alt="google" /></a>
          </div>
        </form>

        <form
          action=""
          className={classes.main_div_autorization_form_register}
          onSubmit={(e) => { e.preventDefault() }}
        >
          <Link
            to="/registration"
            className={classes.main_div_autorization_form_register_button}
          >
            Sign up
          </Link>
        </form>
      </div>
    </main>
    <MyFooter/>
    </>
  )
}
