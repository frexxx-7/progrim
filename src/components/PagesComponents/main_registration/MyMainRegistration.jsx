import React, { useState } from 'react'
import classes from './MyMainRegistration.module.scss'
import eye from "../../../assets/images/eye.png"
import eye2 from "../../../assets/images/eye2.png"
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, update } from "firebase/database";
import useFirebase from '../../../hooks/useFirebase'
import { ref as refSt, getDownloadURL } from 'firebase/storage'


export default function MyMainRegistration() {
  const { auth, database, storage } = useFirebase()

  const [hidePassword, setHidePassword] = useState(false)
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [inputError, setInputError] = useState('')

  const typeText = hidePassword ? 'text' : 'password'

  const changeInput = (e) => {
    const inputPassword = document.querySelector('#password')
    inputPassword.focus()
    !hidePassword
      ?
      (
        e.target.setAttribute('src', eye2),
        setHidePassword(true)
      )
      :
      (
        e.target.setAttribute('src', eye),
        setHidePassword(false)
      )
  }

  const register = async () => {
    if (input1 !== input2) {
      setInputError('password and repeat password do not match')
    } else {
      setInputError('')
      const email = document.getElementById('email').value
      const login = document.getElementById('login').value
      await createUserWithEmailAndPassword(auth, email, input1)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(database, 'users/' + user.uid + '/userData'), {
            id: user.uid,
            name: login,
            status: '',
            date: user.metadata.creationTime
          })

          const storageRef = refSt(storage, `avatars/no-avatar.jpg`)
          getDownloadURL(storageRef)
            .then((url) => {
              update(ref(database, 'users/' + user.uid + '/userData'), {
                photo: url,
              });
            })
        })
        .catch((error) => {
          setInputError(error.message)
        });
    }
  }

  return (
    <main className={classes.main}>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Link to="/autorization"
          className={classes.main_registration_exit}
        >
          Exit
        </Link>
      </form>

      <div className={classes.main_div_registration}>
        <form
          action=""
          className={classes.main_div_registration_form}
        >
          <div className={classes.formContent}>
            <h2 className={classes.main_div_registration_form_h2}>Registration</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className={classes.main_div_registration_form_input_email}
              id="email"
            />
            <input
              type="text"
              name="login"
              placeholder="Login"
              autoComplete="off"
              className={classes.main_div_registration_form_input_login}
              id="login"
            />
            <div className={classes.main_div_registration_form_div}>
              <input
                type={typeText}
                name="password"
                placeholder="Password"
                autoComplete="off"
                className={classes.main_div_registration_form_input_password}
                id="password"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
              <img
                src={eye}
                alt="eye"
                className={classes.main_div_registration_form_div_img}
                id="eye"
                onClick={(e) => changeInput(e)}
              />
            </div>
            <input
              type={typeText}
              name="repeat_password"
              placeholder="Repeat password"
              autoComplete="off"
              className={classes.main_div_registration_form_input_repeat_password}
              id="passwordRepeat"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
            <div style={{ color: 'red', textAlign: 'center' }}>{inputError}</div>
          </div>
        </form>
        <button
          className={classes.main_div_registration_form_button}
          onClick={register}
        >
          Sign up
        </button>
      </div>
    </main>
  )
}
