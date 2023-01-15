import React, { useContext, useEffect, useState } from 'react'
import classes from './Profile.module.scss'
import { ref, set, onValue, update, push, child } from "firebase/database";
import LoaderTwo from '../LoaderTwo'
import MyModal from '../MyModal/MyModal'
import PostsList from '../PostsList/PostsList'
import EditPhoto from '../EditPhoto/EditPhoto'
import friends from "../../assets/images/friends.png"
import ViewFriends from '../ViewFriends/ViewFriends'

const Profile = ({ id, name, photo, status, userID }) => {
  const { database } = useContext(Context)

  const [loadingPosts, setLoadingPosts] = useState(true)
  const [modalPhoto, setModalPhoto] = useState(false)
  const [posts, setPosts] = useState({})
  const [textPost, setTextPost] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [frNumbers, setFrNumbers] = useState({})
  const [modalFriends, setModalFriends] = useState(false)


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
    loadPosts()
    loadFriend()
  }, [id])

  const addPost = () => {
    const newPostsID = push(child(ref(database, 'users/' + id, '/posts'), ' ')).key
    update(ref(database, 'users/' + id + '/posts/' + newPostsID), {
      author: userID,
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
          <a><img onClick={() => setModalPhoto(true)} src={`${photo}`} alt="avatar" /></a>
          <MyModal visible={modalPhoto} setVisible={setModalPhoto}>
            <EditPhoto photo={photo}/>
          </MyModal>
          <div>
            <div className={classes.nameStatus}>
              <h2>{name}</h2>
              <p>{status}</p>
            </div>
          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.friends}>
            <a onClick={() => setModalFriends(true)}>
              <img src={friends} alt="friends" />
              <p className={classes.friendNumber}>{frNumbers && Object.keys(frNumbers).length || 0}</p>
            </a>
            <MyModal visible={modalFriends} setVisible={setModalFriends}>
              <ViewFriends id={id}/>
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
            onClick={addPost}
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