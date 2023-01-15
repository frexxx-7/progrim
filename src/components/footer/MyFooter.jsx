import React from 'react'
import classes from './MyFooter.module.scss'
import instagram from "../../assets/images/instagram.png"
import vkontakte from "../../assets/images/vk.png"

export default function MyFooter() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_social_networks}>
        <p className={classes.footer_social_networks_p}>Social networks:</p>
        <a href="https://instagram.com/frex.x.x7?igshid=YzdkMWQ2MWU="><img src={instagram} alt="Instagram" className={classes.footer_social_networks_img_instagram} /></a>
        <a href="https://vk.com/frexxx_7"><img src={vkontakte} alt="VKontakte" className={classes.footer_social_networks_img_vk} /></a>
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
