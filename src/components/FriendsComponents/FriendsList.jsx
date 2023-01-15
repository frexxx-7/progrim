import React, {useState } from 'react'
import LoaderTwo from '../UI/LoaderTwo'
import classes from './Friends/Friends.module.scss'
import FriendItem from './FriendItem'
import useFirebase from '../../hooks/useFirebase'
import useLoadFriends from '../../hooks/useLoadFriends'


const FriendsList = ({id, deleteFr=true, setVisible}) => {
  const { database } = useFirebase()

  const [friends, setFriends] = useState({})
  const [loadingFriend, setLoadingFriend] = useState(true)

  useLoadFriends(database, id, setFriends, setLoadingFriend)

  if (loadingFriend)
    return <LoaderTwo />

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Friends List</h2>
      </div>
      <div className={classes.friendListDiv}>
        <div className={classes.allFriends}>
          <div className={classes.frinedsListFriend}>
            {!friends
              ?
              <div className={classes.noFriendsDiv}>
                <h2 className={classes.noFriends}>
                  No friends
                </h2>
              </div>
              :
              Object.entries(friends).map(([key, value]) => (
                <FriendItem key={key} idFriend={value} deleteFr={deleteFr} idUser={id} setVisible={setVisible}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(FriendsList)