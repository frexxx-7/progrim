import React, { useState } from 'react'
import EditPhoto from './EditPhoto/EditPhoto'
import EditProfile from './EditProfile/EditProfile'
import LoaderTwo from '../UI/LoaderTwo'
import MyModal from '../UI/MyModal/MyModal'
import PostsList from '../PostsComponents/PostsList/PostsList'
import classes from './Profile.module.scss'
import friends from "../../assets/images/friends.png"
import ViewFriends from '../FriendsComponents/ViewFriends/ViewFriends'
import useFirebase from '../../hooks/useFirebase'
import useLoadProfile from '../../hooks/useLoadProfile'
import useLoadPosts from '../../hooks/useLoadPosts'
import useAddPosts from '../../hooks/useAddPosts'
import useLoadFriends from '../../hooks/useLoadFriends'

const MyProfile = ({ user }) => {
  const { database } = useFirebase()
  const [myProfile, setMyProfile] = useState({})

  const [loadingFriends, setLoadingFriends] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingProfile, setLoadingProfile] = useState(true)

  useLoadProfile(database, setMyProfile, user.uid, setLoadingProfile)

  const [modalEditProfile, setModalEditProfile] = useState(false)
  const [modalPhoto, setModalPhoto] = useState(false)
  const [modalFriends, setModalFriends] = useState(false)

  const [posts, setPosts] = useState({})
  const [textPost, setTextPost] = useState('')
  const [frNumbers, setFrNumbers] = useState({})

  const [changeImage, setChangeImage] = useState(false)

  useLoadPosts(database, myProfile.id, setPosts, setLoadingPosts)

  useLoadFriends(database, myProfile.id, setFrNumbers, setLoadingFriends)

  if (loadingPosts || loadingFriends || loadingProfile)
    return <LoaderTwo />

  return (
    <div className={classes.content}>
      <div className={classes.profileHeader}>


        <div className={classes.profile}>
          <a>
            <img
              onClick={() => setModalPhoto(true)}
              src={myProfile.photo} alt="avatar"
            />
          </a>
          <MyModal visible={modalPhoto} setVisible={setModalPhoto}>
            <EditPhoto photo={myProfile.photo} changeImages={changeImage} setChangeImage={setChangeImage} editing={true} id={myProfile.id} />
          </MyModal>

          <div>
            <div className={classes.nameStatus}>
              <h2>{myProfile.name}</h2>
              <p>{myProfile.status}</p>
            </div>

            <a
              className={classes.editProfile}
              onClick={() => setModalEditProfile(true)}
              onSubmit={(e) => e.preventDefault()}
            >
              Edit profile
            </a>
            <MyModal visible={modalEditProfile} setVisible={setModalEditProfile}>
              <EditProfile profile={myProfile} setVisible={setModalEditProfile} userId={user.uid}/>
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
              <ViewFriends id={myProfile.id} />
            </MyModal>
          </div>

          <div className={classes.date}>
            {`${new Date(myProfile.date).toLocaleDateString()}`}
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
              useAddPosts(database, myProfile.id, setTextPost, textPost, myProfile.id)
            }}
          >
            Create post
          </button>
        </div>

        <div className={classes.postsList}>
          <PostsList posts={posts && Object.entries(posts)} deleteTr={true} userId={user.uid}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MyProfile)