import React, { useState } from 'react'
import classes from './Profile.module.scss'
import LoaderTwo from '../UI/LoaderTwo'
import MyModal from '../UI/MyModal/MyModal'
import PostsList from '../PostsComponents/PostsList/PostsList'
import EditPhoto from './EditPhoto/EditPhoto'

import friends_dark from "../../assets/images/friends-dark.png"
import friends_light from "../../assets/images/friends-light.png"

import ViewFriends from '../FriendsComponents/ViewFriends/ViewFriends'
import useAddPosts from '../../hooks/useAddPosts';
import useLoadPosts from '../../hooks/useLoadPosts';
import useLoadFriends from '../../hooks/useLoadFriends';
import useFirebase from '../../hooks/useFirebase'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Profile = ({ id, name, photo, status, userID }) => {
  const { database } = useFirebase()
  const theme = useSelector(state => state.theme.theme)

  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingFriends, setLoadingFriends] = useState(true)

  const [modalPhoto, setModalPhoto] = useState(false)
  const [modalFriends, setModalFriends] = useState(false)

  const [posts, setPosts] = useState({})
  const [textPost, setTextPost] = useState('')
  const [frNumbers, setFrNumbers] = useState({})

  useLoadPosts(database, id, setPosts, setLoadingPosts)

  useLoadFriends(database, id, setFrNumbers, setLoadingFriends)

  if (loadingPosts || loadingFriends)
    return <LoaderTwo />

  return (
    <div className={classes.content}>
      <div className={classes.profileHeader}>
        <div className={classes.profile}>
          <a><img onClick={() => setModalPhoto(true)} src={`${photo}`} alt="avatar" /></a>
          <MyModal visible={modalPhoto} setVisible={setModalPhoto}>
            <EditPhoto photo={photo} />
          </MyModal>
          <div>
            <div className={classes.nameStatus}>
              <h2>{name}</h2>
              <p>{status}</p>
            </div>

            <div className={classes.sendMessageDiv}>
              <NavLink to={`/messages/${id}`} className={classes.linkMessages}>
                <div className={classes.sendMessage}>Send message</div>
              </NavLink>
            </div>

          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.friends}>
            <a onClick={() => setModalFriends(true)}>
              <img src={eval(`friends_${theme}`)} alt="friends" />
              <p className={classes.friendNumber}>{frNumbers && Object.keys(frNumbers).length || 0}</p>
            </a>
            <MyModal visible={modalFriends} setVisible={setModalFriends}>
              <ViewFriends id={id} setVisible={setModalFriends} />
            </MyModal>
          </div>
        </div>
      </div>

      <div className={classes.posts}>
        <h2>Posts</h2>
        <div className={classes.createPosts}>
          <input
            type="text"
            placeholder='Text posts...'
            value={textPost}
            onChange={(e) => setTextPost(e.target.value)}
          />
          <button
            className={classes.createPostsButton}
            onClick={() => {
              useAddPosts(database, id, setTextPost, textPost, userID)
            }}
          >
            Create post
          </button>
        </div>

        <div className={classes.postsList}>
          {loadingPosts
            ? <LoaderTwo />
            : <PostsList posts={posts && Object.entries(posts)} deleteTr={false} />
          }
        </div>
      </div>
    </div>
  )
}

export default Profile