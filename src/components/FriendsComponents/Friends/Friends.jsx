import React from 'react'
import classes from './Friends.module.scss'
import { Link } from 'react-router-dom'

const Friends = ({ ComponentCh }) => {
  return (
    <div className={classes.friends}>
      <div className={classes.friendsList}>
        {ComponentCh}
      </div>
      <div className={classes.friendsNavbar}>
        <div className={classes.friendsNavbarDiv}>
          <ul className={classes.friendsButtons}>
            <li><Link to={`/friends`}>My friends</Link></li>
            <li><Link to={`/friends/search`}>Search friends</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Friends