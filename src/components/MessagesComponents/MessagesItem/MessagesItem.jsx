import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import useLoadProfile from '../../../hooks/useLoadProfile'
import LoaderTwo from '../../UI/LoaderTwo'
import classes from './MessagesItem.module.scss'

const MessagesItem = ({ id, lastMessage, userId }) => {
  const { database } = useFirebase()

  const [profile, setProfile] = useState()
  const [myProfile, setMyProfile] = useState()
  const [loading, setLoading] = useState()
  const [isLoading, setIsLoading] = useState()

  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }
  
  useLoadProfile(database, setProfile, id, setLoading)
  useLoadProfile(database, setMyProfile, userId, setIsLoading)

  if (loading || isLoading) {
    return <LoaderTwo />
  }

  return (
    <NavLink to={`/messages/${id}`} className={classes.messageItem}>
      <div className={classes.userInfo}>

        <div className={classes.user}>
          <img src={profile && profile.photo} alt="user" />
        </div>

        <div className={classes.message}>
          <div className={classes.nameDate}>
            <div className={classes.dataName}>
              <h6>{profile && profile.name}</h6>
            </div>

            <div className={classes.dataDate}>
              <p>{getDate(lastMessage.date)}</p>
            </div>
          </div>

          <div className={classes.lastMessage}>
            <div className={classes.userMessage}>
              {myProfile && lastMessage.user === myProfile.id ? 'You:':''}
            </div>
            <div className={classes.messageUser}>
              {lastMessage.message}
            </div>
          </div>
        </div>

      </div>
    </NavLink>
  )
}

export default React.memo(MessagesItem)