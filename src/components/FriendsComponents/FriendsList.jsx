import React, { useContext, useEffect, useState } from 'react'
import LoaderTwo from '../UI/LoaderTwo'
import classes from './Friends/Friends.module.scss'
import { onValue, ref } from 'firebase/database'
import FriendItem from './FriendItem'
import useFirebase from '../../hooks/useFirebase'


const FriendsList = ({id, deleteFr=true}) => {
  const { database } = useFirebase()
  const [friends, setFriends] = useState({})
  const [loadingFriend, setLoadingFriend] = useState(true)

  const loadFriend = () => {
    const userData = ref(database, 'users/' + id + '/friends');
    onValue(userData, (snapshot) => {
      setFriends(snapshot.val())
      setLoadingFriend(false)
    });
  }


  useEffect(() => {
    loadFriend()
  }, [])

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Friends List</h2>
      </div>
      <div className={classes.friendListDiv}>
        <div className={classes.allFriends}>
          <div className={classes.frinedsListFriend}>
            {loadingFriend ? <LoaderTwo /> : ''}
            {!friends
              ?
              <div className={classes.noFriendsDiv}>
                <h2 className={classes.noFriends}>
                  No friends
                </h2>
              </div>
              :
              Object.entries(friends).map(([key, value]) => (
                <FriendItem key={key} idFriend={value} deleteFr={deleteFr}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default FriendsList