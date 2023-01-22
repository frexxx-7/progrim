import { ref, remove } from 'firebase/database'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './UserItem/UserItem.module.scss'
import classes2 from './Friends/Friends.module.scss'
import LoaderTwo from '../UI/LoaderTwo'
import useFirebase from '../../hooks/useFirebase'
import useLoadProfile from '../../hooks/useLoadProfile'

const FriendItem = ({ idFriend, deleteFr, idUser, setVisible }) => {
  const { database } = useFirebase()

  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useLoadProfile(database, setProfile, idFriend, setIsLoading)

  const deleteFriend = () => {
    remove(ref(database, 'users/' + idUser + '/friends/' + idFriend))
    remove(ref(database, 'users/' + idFriend + '/friends/' + idUser))
  }

  if (isLoading)
    return <LoaderTwo />

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${profile.id}`} onClick={() => setVisible && setVisible(false)}>
        <div className={classes.photo}>
          <img src={profile.photo} alt="photo" />
        </div>
        <div className={classes.info}>
          <p className={classes.name}>{profile.name}</p>
          <p className={classes.quote}>{profile.status}</p>
        </div>
      </NavLink>
      {deleteFr
        ?
        <div className={classes2.buttons}>
          <NavLink to={`/messages/${profile.id}`}>
            <div className={classes2.sendMessageDiv}>
              <div className={classes2.sendMessage}>Send message</div>
            </div>
          </NavLink>


          <div className={classes2.deleteDiv} onClick={deleteFriend}>
            <a className={classes2.delete} >Delete</a>
          </div>

        </div>
        :
        ''
      }
    </div>
  )
}

export default React.memo(FriendItem)