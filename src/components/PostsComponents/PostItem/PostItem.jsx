import { onValue, ref, remove } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useFirebase from '../../../hooks/useFirebase'
import classes from './PostItem.module.scss'

const PostItem = ({ idPost, author, body, date, deleteTr }) => {
  const [authorPost, setAuthorPost] = useState({})
  const { database, loadUser } = useFirebase()
  const [user] = loadUser()

  const getDate = (date) => {
    const timePost = new Date(date).toLocaleTimeString().slice(0, -3)
    const datePost = new Date(date).toLocaleDateString()
    return `${datePost} ${timePost}`
  }
  const loadAuthor = () => {
    const userData = ref(database, 'users/' + author + '/userData');
    onValue(userData, (snapshot) => {
      setAuthorPost(snapshot.val())
    });
  }

  useEffect(() => {
    loadAuthor()
  }, [])

  const deletePost = () => {
    remove(ref(database, 'users/' + user.uid + '/posts/' + idPost))
  }

  return (
    <div className={classes.postItem}>
      <div>
        <div className={classes.authorInfo}>
          <div className={classes.author}>
            <img src={authorPost.photo} alt="author" />
          </div>
          <div className={classes.dateName}>
            <h3>{authorPost.name}</h3>
            <p>{getDate(date)}</p>
          </div>
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

export default PostItem