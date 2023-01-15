import React, { useContext, useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import classes from './Friends/Friends.module.scss'
import LoaderTwo from './LoaderTwo'
import UsersList from './UsersList/UsersList'

const SearchFriends = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)
  const { database } = useContext(Context)
  const [friends, setFriends] = useState({})
  const [loadingFriend, setLoadingFriend] = useState(true)

  const loadFriend = () => {
    const userData = ref(database, 'users/' + user.uid + '/friends');
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
        <h2>Search friends</h2>
      </div>

      <div className={classes.frinedsListFriend}>
        {
          loadingFriend ? <LoaderTwo /> : <UsersList myFriends={ friends && Object.entries(friends).map(([key, value]) => value)}/>
        }
      </div>
    </>
  )
}

export default SearchFriends