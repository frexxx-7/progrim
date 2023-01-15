import { onValue, ref, update } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useFirebase from '../../hooks/useFirebase'
import Loader from '../Loader'
import classes from './EditProfile.module.scss'

const EditProfile = ({setVisible}) => {
  const { auth, database } = useFirebase()
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [loginInput, setLoginInput] = useState()
  const [quoteInput, setQuoteInput] = useState()

  const [user] = useAuthState(auth)

  const loadProfile = () => {
    const userData = ref(database, 'users/' + user.uid + '/userData'); 
    onValue(userData, (snapshot) => {
      setProfile(snapshot.val())
      setIsLoading(false)
      setLoginInput(snapshot.val().name)
      setQuoteInput(snapshot.val().status)
    });
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const changeProfile = () => {
    update(ref(database, 'users/' + user.uid + '/userData'), {
      name: loginInput,
      status: quoteInput
    });
  }

  if (isLoading)
    return <Loader />

  return (
    <div className={classes.editProfile}>
      <div className={classes.editProfileContent}>
        <div>
          <h4>Login:</h4>
          <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
        </div>
        <div>
          <h4>Quote:</h4>
          <input
            type="text"
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
          />
        </div>
        <div className={classes.divSaveButton}>
          <a 
          className={classes.saveButton}
          onClick={()=>{
            changeProfile()
            setVisible(false)
          }}
          >
            Save</a>
        </div>
      </div>
    </div>
  )
}

export default EditProfile