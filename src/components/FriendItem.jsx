import { onValue, ref, remove } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom'
import classes from './UserItem/UserItem.module.scss'
import classes2 from './Friends/Friends.module.scss'
import LoaderTwo from './LoaderTwo'
import useFirebase from '../hooks/useFirebase'

const FriendItem = ({idFriend, deleteFr }) => {
  const [profile, setProfile] = useState({})
  const { auth, database, loadUser } = useFirebase()
  const [isLoading, setIsLoading] = useState(true)
  const [user] = loadUser()
  const loadProfile = () => {
    const userData = ref(database, 'users/' + idFriend + '/userData');
    onValue(userData, (snapshot) => {
      setProfile(snapshot.val())
      setIsLoading(false)
    });
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const deleteFriend = () => {
    remove(ref(database, 'users/' + user.uid + '/friends/' + idFriend))
    remove(ref(database, 'users/' + idFriend + '/friends/' + user.uid))
  }

  if (isLoading)
    return <LoaderTwo />

  return (
    <div className={classes.user}>
      <NavLink to={profile.id !== user.uid ? `/profile/${profile.id}` : `/profile`}>
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
        <div className={classes2.deleteDiv} onClick={deleteFriend}>
          <a className={classes2.delete} >Delete</a>
        </div>
        :
        ''
      }
    </div>
  )
}

export default FriendItem