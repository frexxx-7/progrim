import { child, push, ref, update } from 'firebase/database'
import React, { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom'
import classes from './UserItem.module.scss'
import checkMark from "../../../assets/images/checkMark.png"

const UserItem = ({ id, name, photo, status }) => {
  const { database } = useContext(Context)
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)
  const [added, setAdded] = useState(false)

  const addFriend = () => {
    update(ref(database, 'users/' + user.uid + '/friends/'), {
      [`${id}`]:id
    });
    update(ref(database, 'users/' + id + '/friends/'), {
      [`${user.uid}`]:user.uid
    });
    setAdded(true)
  }

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${id}`}>
        <div className={classes.photo}>
          <img src={photo} alt="photo" />
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{name}</p>
          <p className={classes.quote}>{status}</p>
        </div>
      </NavLink>

      <div className={classes.add}>
        { !added
          ? <a className={classes.addButton} onClick={addFriend}>Add</a>
          : <img className={classes.checkMark} src={checkMark} alt="CheckMark" />
        }
      </div>

    </div>
  )
}

export default UserItem