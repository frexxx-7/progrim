import { child, onValue, push, ref, update } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import EditPhoto from '../EditPhoto/EditPhoto'
import EditProfile from '../EditProfile/EditProfile'
import LoaderTwo from '../UI/LoaderTwo'
import MyModal from '../UI/MyModal/MyModal'
import PostsList from '../PostsComponents/PostsList/PostsList'
import classes from './Profile.module.scss'
import friends from "../../assets/images/friends.png"
import ViewFriends from '../FriendsComponents/ViewFriends/ViewFriends'
import useFirebase from '../../hooks/useFirebase'

const MyProfile = ({ id, name, photo, status, date }) => {
  const { database } = useFirebase()

  const [loadingPosts, setLoadingPosts] = useState(true)
  const [modalEditProfile, setModalEditProfile] = useState(false)
  const [modalPhoto, setModalPhoto] = useState(false)
  const [modalFriends, setModalFriends] = useState(false)
  const [posts, setPosts] = useState({})
  const [textPost, setTextPost] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [frNumbers, setFrNumbers] = useState({})
  const [changeImage, setChangeImage] = useState(false)

  const loadPosts = () => {
    const userData = ref(database, 'users/' + id + '/posts');
    onValue(userData, (snapshot) => {
      setPosts(snapshot.val())
      setLoadingPosts(false)
      setIsLoading(false)
    });
  }
  const loadFriend = () => {
    const userData = ref(database, 'users/' + id + '/friends');
    onValue(userData, (snapshot) => {
      setFrNumbers(snapshot.val())
    });
  }

  useEffect(() => {
    loadFriend()
    loadPosts()
  }, [id])


  const addPost = () => {
    const newPostsID = push(child(ref(database, 'users/' + id, '/posts'), ' ')).key
    update(ref(database, 'users/' + id + '/posts/' + newPostsID), {
      author: id,
      body: textPost,
      date: Date.now()
    });
    setTextPost('')
  }

  if (isLoading)
    return <LoaderTwo />

  return (
    <div className={classes.content}>
      <div className={classes.profileHeader}>
        <div className={classes.profile}>
          <a><img onClick={() => setModalPhoto(true)} src={photo} alt="avatar" /></a>
          <MyModal visible={modalPhoto} setVisible={setModalPhoto}>
            <EditPhoto photo={photo} changeImages={changeImage} setChangeImage={setChangeImage} editing={true} id={id} />
          </MyModal>
          <div>
            <div className={classes.nameStatus}>
              <h2>{name}</h2>
              <p>{status}</p>
            </div>
            <a
              className={classes.editProfile}
              onClick={() => setModalEditProfile(true)}
              onSubmit={(e) => e.preventDefault()}
            >
              Edit profile
            </a>
            <MyModal visible={modalEditProfile} setVisible={setModalEditProfile}>
              <EditProfile setVisible={setModalEditProfile} />
            </MyModal>
          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.friends}>
            <a onClick={() => setModalFriends(true)}>
              <img src={friends} alt="friends" />
              <p className={classes.friendNumber}>{frNumbers && Object.keys(frNumbers).length || 0}</p>
            </a>
            <MyModal visible={modalFriends} setVisible={setModalFriends}>
              <ViewFriends id={id} />
            </MyModal>
          </div>

          <div className={classes.date}>
            {`${new Date(date).toLocaleDateString()}`}
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
            onClick={addPost}
          >
            Create post
          </button>
        </div>

        <div className={classes.postsList}>
          {loadingPosts
            ? <LoaderTwo />
            : <PostsList posts={posts && Object.entries(posts)} deleteTr={true} />
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile