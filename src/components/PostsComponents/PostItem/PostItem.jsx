import { ref, remove } from 'firebase/database'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useFirebase from '../../../hooks/useFirebase'
import useLoadProfile from '../../../hooks/useLoadProfile'
import classes from './PostItem.module.scss'

const PostItem = ({ idPost, author, body, date, deleteTr, userId }) => {
  const { database } = useFirebase()

  const [authorPost, setAuthorPost] = useState({})

  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }

  useLoadProfile(database, setAuthorPost, author)

  const deletePost = () => {
    remove(ref(database, 'users/' + userId + '/posts/' + idPost))
  }

  return (
    <div className={classes.postItem}>
      <div>
        <div className={classes.authorInfo}>
          <NavLink to={`/profile/${author}`}>
            <div className={classes.author}>
              <img src={authorPost.photo} alt="author" />
            </div>
            <div className={classes.dateName}>
              <h3>{authorPost.name}</h3>
              <p>{getDate(date)}</p>
            </div>
          </NavLink>
        </div>
        <div className={classes.body}>
          {body}
        </div>
      </div>
      {
        deleteTr
          ?
          <div className={classes.deleteDiv} onClick={deletePost}>
            <a className={classes.delete} >Delete</a>
          </div>
          :
          ''
      }

    </div>
  )
}

export default React.memo(PostItem)