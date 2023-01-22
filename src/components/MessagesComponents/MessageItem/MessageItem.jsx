import React from 'react'
import classes from './MessageItem.module.scss'

const MessageItem = ({ body, date, author, profile, myProfile, idUser }) => {
  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }

  return (
    <div className={author === idUser ? classes.messageItemMyMessage : classes.messageUserMessage}>
      <div className={author === idUser ? classes.myImage : classes.image}>
        <img src={author === idUser ? myProfile.photo : profile.photo} alt="" />
      </div>
      <div className={author === idUser ? classes.messageItemMyContainer : classes.messageUserContainer}>
        <div className={author === idUser ? classes.myMessageItem : classes.messageItem}>
          <div className={author === idUser ? classes.myBody : classes.body}>
            <p>{body}</p>
          </div>
          <div className={author === idUser ? classes.myInfo : classes.info}>
            <p className={author === idUser ? classes.myDate : classes.date}>
              {getDate(date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MessageItem)