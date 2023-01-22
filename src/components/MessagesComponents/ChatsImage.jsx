import React from 'react'
import classes from './Messages/Messages.module.scss'

import chats_dark from './../../assets/images/chats-dark.png'
import chats_light from './../../assets/images/chats-light.png'

import { useSelector } from 'react-redux'

const ChatsImage = () => {
  const theme = useSelector(state => state.theme.theme)
  
  return (
    <div className={classes.correspondence}>
      <div className={classes.chatsImage}>
        <img src={eval(`chats_${theme}`)} alt="chats" />
      </div>
    </div>
  )
}

export default ChatsImage