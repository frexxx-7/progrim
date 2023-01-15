import { ref, update } from 'firebase/database'
import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './UserItem.module.scss'
import useFirebase from '../../../hooks/useFirebase'

const UserItem = ({ id, name, photo, status, idUser }) => {
  const { database } = useFirebase()

  const addFriend = () => {
    update(ref(database, 'users/' + idUser + '/friends/'), {
      [`${id}`]:id
    });
    update(ref(database, 'users/' + id + '/friends/'), {
      [`${idUser}`]:idUser
    });
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
        <a className={classes.addButton} onClick={addFriend}>Add</a>
      </div>

    </div>
  )
}

export default React.memo(UserItem)