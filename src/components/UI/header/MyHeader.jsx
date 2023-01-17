import React, { useEffect } from 'react'
import classes from './MyHeader.module.scss'
import icon_light from '../../../assets/images/icon-light.png'
import icon_dark from '../../../assets/images/icon-dark.png'
import classNames from 'classnames';
import '../../../assets/scss/variables.scss';
import { useDispatch, useSelector } from 'react-redux'
import { changeThemes } from '../../../redux/themeReducer';
import useTheme from '../../../hooks/useTheme';

export default function MyHeader() {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.theme)

  const changeTheme = (themes) => {
    dispatch(changeThemes(themes))
  }

  const toggleTheme = () => {
    theme === 'dark'
      ?
      changeTheme('light')
      :
      changeTheme('dark')
    useTheme(theme)
  }

  useEffect(()=>{
    useTheme(theme)
  }, [theme])

  return (
    <header className={classes.header}>
      <div className={classes.header_info}>
        <div className={classes.header_info_icon}><img src={eval(`icon_${theme}`)} alt={"Progrim"} /></div>
        <div className={classes.header_info_name}><p>Progrim</p></div>
      </div>
      <div className={classes.toggleButton}>
        <input type="checkbox" className={classes.checkbox} id="checkbox" onClick={toggleTheme} defaultChecked={theme === 'dark'} />
        <label htmlFor="checkbox" className={classes.label}>
          <i className={classNames(classes.fas, classes.fa_moon)}></i>
          <i className={classNames(classes.fas, classes.fa_sun)}></i>
          <div className={classes.ball} />
        </label>
      </div>
    </header>
  )
}
