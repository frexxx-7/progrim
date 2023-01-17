import React, { useEffect, useState } from 'react'
import classes from './Messages.module.scss'

import chats_dark from '../../assets/images/chats-dark.png'
import chats_light from '../../assets/images/chats-light.png'

import { onValue, ref } from 'firebase/database'
import LoaderTwo from '../UI/LoaderTwo'
import useFirebase from '../../hooks/useFirebase'
import { useSelector } from 'react-redux'

const Messages = ({userId}) => {
  const { database } = useFirebase()
  const theme = useSelector(state => state.theme.theme)

  const [messages, setMessages] = useState({})
  const [loadingMessages, setLoadingMessages] = useState(true)

  const loadMessages = () => {
    const userData = ref(database, 'users/' + userId + '/messages');
    onValue(userData, (snapshot) => {
      setMessages(snapshot.val())
      setLoadingMessages(false)
    });
  }

  useEffect(() => {
    loadMessages()
  }, [])

  return (
    <div className={classes.message}>
      <div className={classes.chats}>
        <div className={classes.header}>
          <h2>Chats</h2>
        </div>
        <div className={classes.chatsList}>
            {loadingMessages ? <LoaderTwo /> : ''}
            {!messages ? <div className={classes.noChatsDiv}><h2 className={classes.noChats}>No chats</h2></div> : ''}
          </div>
      </div>

      <div className={classes.correspondence}>
        <div className={classes.chatsImage}>
          <img src={eval(`chats_${theme}`)} alt="chats" />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Messages)