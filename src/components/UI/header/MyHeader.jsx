import React from 'react'
import classes from './MyHeader.module.scss'
import icon from '../../../assets/images/icon.png'

export default function MyHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.header_info}>
        <div className={classes.header_info_icon}><img src={icon} alt={"Progrim"} /></div>
        <div className={classes.header_info_name}><p>Progrim</p></div>
      </div>
    </header>
  )
}
