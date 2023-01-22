import React, { useEffect, useState } from 'react'
import classes from './Messages.module.scss'

import { onValue, ref } from 'firebase/database'
import LoaderTwo from '../../UI/LoaderTwo'
import useFirebase from '../../../hooks/useFirebase'
import MessagesItem from '../MessagesItem/MessagesItem'

const Messages = ({ userId, ComponetCh }) => {
  const { database } = useFirebase()

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
      <div className={classes.chats} id="chats">
        <div className={classes.header}>
          <h2>Chats</h2>
        </div>
        <div className={classes.chatsList}>
          {loadingMessages ? <LoaderTwo /> : ''}
          {!messages
            ?
            <div className={classes.noChatsDiv}><h2 className={classes.noChats}>No chats</h2></div>
            :
            messages && Object.entries(messages).map(([key, value]) => (
              <MessagesItem userId={userId} key={key} id={value.messageData.id} date={value.messageData.date} lastMessage={value.messageData.lastMessage} />
            ))
          }
        </div>
      </div>
      {ComponetCh}
    </div>
  )
}

export default React.memo(Messages)