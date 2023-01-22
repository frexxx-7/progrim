import React from 'react'
import classes from './Messages/Messages.module.scss'

import { useSelector } from 'react-redux'

const ChatsImage = () => {
  const theme = useSelector(state => state.theme.theme)
  
  return (
    <div className={classes.correspondence}>
      <div className={classes.chatsImage}>
        <img src={`/chats-${theme}.png`} alt="chats" />
      </div>
    </div>
  )
}

export default ChatsImage