import React from 'react'
import classes from './MyFooter.module.scss'

import { useSelector } from 'react-redux'

export default function MyFooter() {
  const theme = useSelector(state => state.theme.theme)

  return (
    <footer className={classes.footer}>
      <div className={classes.footer_social_networks}>
        <p className={classes.footer_social_networks_p}>Social networks:</p>
        <a href="https://instagram.com/frex.x.x7?igshid=YzdkMWQ2MWU="><img src={`./instagram-${theme}.png`} alt="Instagram" className={classes.footer_social_networks_img_instagram} /></a>
        <a href="https://vk.com/frexxx_7"><img src={`./vk-${theme}.png`} alt="VKontakte" className={classes.footer_social_networks_img_vk} /></a>
      </div>

      <div className={classes.footer_name}>
        <p className={classes.footer_name_p}>©Progrim 2023</p>
      </div>

      <div className={classes.footer_nav}>
        <ul className={classes.footer_nav_ul}>
          <li>
            <a href="">Progrim</a>
          </li>
          <li>
            <a href="">Rules</a>
          </li>
          <li>
            <a href="">Developers</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
