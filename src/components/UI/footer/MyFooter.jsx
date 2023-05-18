import React from 'react'
import classes from './MyFooter.module.scss'
import Progrim from "../../PagesComponents/Progrim/Progrim"

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function MyFooter() {
  const theme = useSelector(state => state.theme.theme)

  return (
    <footer className={classes.footer}>
      <div className={classes.footer_name}>
        <p className={classes.footer_name_p}>©Progrim 2023</p>
      </div>
      <div className={classes.footer_nav}>
        <ul className={classes.footer_nav_ul}>
          <li>
            <Link to='/progrim'>Progrim</Link>
          </li>   
          <li>
            <Link to="/rules">Rules</Link>
          </li>
          <li>
            <Link to="/developers">Developers</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
