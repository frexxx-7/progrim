import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import LoaderTwo from './LoaderTwo'
import MyProfile from './Profile/MyProfile'
import Profile from './Profile/Profile'

const LoadProfile = () => {
  const idUrl = window.location.pathname.substring(9)
  const { auth } = useContext(Context)
  const { database } = useContext(Context)
  const [user] = useAuthState(auth)

  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = () => {
    const userData = ref(database, 'users/' + idUrl + '/userData');
    onValue(userData, (snapshot) => {
      setProfile(snapshot.val())
      setIsLoading(false)
    });
  }

  useEffect(() => {
    loadProfile()
  }, [])
  
  if (isLoading)
    return <LoaderTwo />

  return (
    <Profile id={profile.id} name={profile.name} photo={profile.photo} status={profile.status} userID={user.uid} />
  )
}

export default LoadProfile