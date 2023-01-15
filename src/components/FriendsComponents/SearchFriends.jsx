import React, { useState } from 'react'
import classes from './Friends/Friends.module.scss'
import LoaderTwo from '../UI/LoaderTwo'
import UsersList from './UsersList/UsersList'
import useFirebase from '../../hooks/useFirebase'
import useLoadFriends from '../../hooks/useLoadFriends'

const SearchFriends = ({idUser}) => {
  const { database } = useFirebase()

  const [friends, setFriends] = useState({})
  const [loadingFriend, setLoadingFriend] = useState(true)

  useLoadFriends(database, idUser, setFriends, setLoadingFriend)

  return (
    <>
      <div className={classes.friendListH2}>
        <h2>Search friends</h2>
      </div>

      <div className={classes.frinedsListFriend}>
        {
          loadingFriend
            ? <LoaderTwo />
            : <UsersList myFriends={friends && Object.entries(friends).map(([value]) => value)} idUser={idUser}/>
        }
      </div>
    </>
  )
}

export default React.memo(SearchFriends)