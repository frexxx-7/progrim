import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './Sidebar.module.scss'

const Sidebar = () => {
  const theme = useSelector(state => state.theme.theme)

  return (
    <aside className={classes.sidebar}>
      <ul className={classes.sidebar_ul}>
        <li className={classes.sidebar_ul_li}>
          <Link to={`/profile`}>
            <div><img src={`/people-${theme}.png`} alt="profile" /></div>
            <p>Profile</p>
          </Link>
        </li>
        <li className={classes.sidebar_ul_li}>
          <Link to={`/messages`}>
            <div><img src={`/messages-${theme}.png`} alt="messages" /></div>
            <p>Messages</p>
          </Link>
        </li>
        <li className={classes.sidebar_ul_li}>
          <Link to={`/friends`}>
            <div><img src={`/friends-${theme}.png`} alt="friends" /></div>
            <p>Friends</p>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar