import { onValue, ref, child, push, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import useLoadProfile from '../../../hooks/useLoadProfile'
import LoaderTwo from '../../UI/LoaderTwo'
import MessageItem from '../MessageItem/MessageItem'
import classes from './OpenMessages.module.scss'

const OpenMessages = ({ idUser }) => {
  const idUrl = window.location.pathname.substring(10)

  const { database } = useFirebase()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({})
  const [myProfile, setMyProfile] = useState()

  const [isLoading, setIsLoading] = useState(true)
  const [isMyLoading, seetIsMyLoading] = useState(true)
  const [messages, setMessages] = useState({})
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [textMessage, setTextMessage] = useState('')

  useLoadProfile(database, setProfile, idUrl, setIsLoading)
  useLoadProfile(database, setMyProfile, idUser, seetIsMyLoading)

  useEffect(() => {
    if (!profile)
      navigate('/messages')
  })

  const loadMessages = () => {
    const userData = ref(database, 'users/' + idUser + '/messages/' + profile.id + '/messages');
    onValue(userData, (snapshot) => {
      setMessages(snapshot.val())
      setLoadingMessages(false)
    });
  }

  const createDatabaseMessage = () => {
    const input = document.getElementById('inputMessage')
    if (textMessage !== '') {
      const newMessageID = push(child(ref(database, 'users/' + idUser, '/messages/messages'), ' ')).key
      update(ref(database, 'users/' + idUser + '/messages/' + idUrl + '/messages/' + newMessageID), {
        author: idUser,
        body: textMessage,
        date: Date.now()
      });
      update(ref(database, 'users/' + idUser + '/messages/' + idUrl + '/messageData/'), {
        id: idUrl
      });
      update(ref(database, 'users/' + idUser + '/messages/' + idUrl + '/messageData/lastMessage'), {
        user: idUser,
        message: textMessage,
        date: Date.now()
      });


      update(ref(database, 'users/' + idUrl + '/messages/' + idUser + '/messages/' + newMessageID), {
        author: idUser,
        body: textMessage,
        date: Date.now()
      });
      update(ref(database, 'users/' + idUrl + '/messages/' + idUser + '/messageData/'), {
        id: idUser
      });
      update(ref(database, 'users/' + idUrl + '/messages/' + idUser + '/messageData/lastMessage'), {
        user: idUser,
        message: textMessage,
        date: Date.now()
      });
      setTextMessage('')
      input.classList.remove(classes.errorInput)
    } else {
      input.classList.add(classes.errorInput)
    }
  }

  const scroll = () => {
    const main = document.getElementById('main')

    setTimeout(() => {
      main && main.scrollTo(0, main.scrollHeight)
    }, 0);
  }

  const openChants = () => {
    const chats = document.getElementById('chats')
    chats.style.display = 'block'
  }

  useEffect(() => {
    if (profile)
      loadMessages()
    if (window, innerWidth <= 620) {
      const chats = document.getElementById('chats')
      chats.style.display = 'none'
      const openMessage = document.getElementById('openMessage')
      openMessage && setTimeout(() => {
        openMessage.style.display = 'block'
      }, 0);
    }
  }, [profile])

  useEffect(() => {
    scroll()
  }, [messages])

  if (loadingMessages || isLoading || isMyLoading) {
    return <div className={classes.loader}>
      <LoaderTwo />
    </div>
  }

  if (profile)
    return (
      <div className={classes.OpenMessages} id="openMessage">
        <div className={classes.head}>
          <div className={classes.userName}>
            {window.innerWidth<=620 ?  <NavLink to={`/messages`} onClick={openChants} className={classes.openChants}>{'<'}</NavLink> : ''}
            <NavLink to={`/profile/${profile.id}`}> <p>{profile.name}</p> </NavLink>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.userAvatar}>
              <NavLink to={`/profile/${profile.id}`}><img src={profile.photo} alt="avatar" /> </NavLink>
            </div>
          </div>
        </div>

        <div className={classes.main} id='main'>
          {messages && Object.entries(messages).map(([key, value]) => (
            <MessageItem key={key} body={value.body} date={value.date} author={value.author} profile={profile} myProfile={myProfile} idUser={idUser} />
          ))}
        </div>

        <div className={classes.footer}>
          <div className={classes.inputDiv}>
            <input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' ? createDatabaseMessage() : ''}
              placeholder='Write a message...'
              id='inputMessage'
            />
          </div>

          <div className={classes.sendButtonDiv}>
            <button className={classes.sendButton} onClick={createDatabaseMessage} onSubmit={(e) => e.preventDefault()}>Send</button>
          </div>
        </div>
      </div>
    )
}

export default React.memo(OpenMessages)