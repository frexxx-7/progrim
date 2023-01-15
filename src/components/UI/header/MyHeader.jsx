import React from 'react'
import classes from './MyHeader.module.scss'
import icon from '../../../assets/images/icon.png'
import classNames from 'classnames';

export default function MyHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.header_info}>
        <div className={classes.header_info_icon}><img src={icon} alt={"Progrim"} /></div>
        <div className={classes.header_info_name}><p>Progrim</p></div>
      </div>
      <div className={classes.toggleButton}>
        <input type="checkbox" className={classes.checkbox} id="checkbox" />
          <label htmlFor="checkbox" className={classes.label}>
            <i className={classNames(classes.fas, classes.fa_moon)}></i>
            <i className={classNames(classes.fas, classes.fa_sun)}></i>
            <div className={classes.ball} />
          </label>
      </div>
    </header>
  )
}
