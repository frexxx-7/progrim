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
    return <div style={{height:"20%"}}><LoaderTwo /></div>

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
          <NavLink to={`/messages/${profile.id}`} className={classes2.sendMessageA}>
            {
              window.innerWidth<=620
              ? <i className="fa-regular fa-envelope"></i>
              : 'Send message'
            }
           
          </NavLink>


          <a className={classes2.delete} onClick={deleteFriend}>
            {
              window.innerWidth<=620
              ? <i className="fa-solid fa-trash"></i>
              : 'Delete'
            }
          </a>

        </div>
        :
        ''
      }
    </div>
  )
}

export default React.memo(FriendItem)