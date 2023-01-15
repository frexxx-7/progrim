import { ref, update } from 'firebase/database'
import React, { useState } from 'react'
import useFirebase from '../../../hooks/useFirebase'
import classes from './EditProfile.module.scss'

const EditProfile = ({ setVisible, userId, profile }) => {
  const { database } = useFirebase()

  const [loginInput, setLoginInput] = useState(profile.name)
  const [quoteInput, setQuoteInput] = useState(profile.status)

  const changeProfile = () => {
    update(ref(database, 'users/' + userId + '/userData'), {
      name: loginInput,
      status: quoteInput
    });
  }

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
            onClick={() => {
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

export default React.memo(EditProfile)