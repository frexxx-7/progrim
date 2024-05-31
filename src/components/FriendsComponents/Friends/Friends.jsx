import React, { useState } from 'react'
import classes from './Friends.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../../redux/searchQueryReducer'

const Friends = ({ ComponentCh, visibleSearch }) => {
  const dispatch = useDispatch();

  const changeSearchQuery = (searchQuery) => {
    dispatch(setSearchQuery(searchQuery))
  }

  return (
    <div className={classes.friends}>
      <div className={classes.friendsList}>
        {ComponentCh}
      </div>
      <div className={classes.friendsNavbar}>
        <div className={classes.friendsNavbarDiv}>
          <ul className={classes.friendsButtons}>
            <li><Link to={`/friends`}>
              {
                window.innerWidth <= 620
                  ? <i className="fa-solid fa-user-group"></i>
                  : 'My friends'
              }
            </Link></li>
            <li><Link to={`/friends/search`}>
              {
                window.innerWidth <= 620
                  ? <i className="fa-solid fa-magnifying-glass"></i>
                  : 'Search friends'
              }
            </Link></li>
            {
              visibleSearch ?
              <li>
              <input
                type="text"
                onChange={(e) => changeSearchQuery(e.target.value)}
                className={classes.searchInput}
                placeholder='Search'
              />
            </li>
              :
              ""
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Friends
