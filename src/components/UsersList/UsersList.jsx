import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoaderTwo from '../LoaderTwo'
import UserItem from '../UserItem/UserItem'
import classes from './UsersList.module.scss'

const UsersList = ({ myFriends }) => {
  const { database } = useContext(Context)
  const [usersList, setUsersList] = useState({})
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [usersData, setUsersData] = useState([{}])
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  const loadUsers = () => {
    const userData = ref(database, 'users');
    onValue(userData, (snapshot) => {
      setUsersList(snapshot.val())
      setLoadingUsers(false)
    });
  }

  const getInfoUsers = () => {
    if (!loadingUsers) {
      const fullInfo = Object.entries(usersList)
      setUsersData(fullInfo.map((user) => {
        return user[1].userData
      }))
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    getInfoUsers()
  }, [loadingUsers])
  if (loadingUsers)
    return <LoaderTwo />
  return (
    <div className={classes.usersList}>
      <div className={classes.allUsers}>
        {usersData.map((userDataMap) => {
          if(myFriends && myFriends.find(e=>e===userDataMap.id))
            return ''
          return userDataMap.id !== user.uid && <UserItem key={`${userDataMap.id}`} id={userDataMap.id} name={userDataMap.name} photo={userDataMap.photo} status={userDataMap.status} />
        })}
      </div>
    </div>
  )
}

export default UsersList