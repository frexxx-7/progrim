import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFirebase from '../../hooks/useFirebase'
import useLoadProfile from '../../hooks/useLoadProfile'
import LoaderTwo from '../UI/LoaderTwo'
import Profile from './Profile'

const LoadProfile = ({ userId }) => {
  const idUrl = window.location.pathname.substring(9)

  const { database } = useFirebase()

  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useLoadProfile(database, setProfile, idUrl, setIsLoading)

  useEffect(() => {
    if (!profile || userId == profile.id)
      navigate('/profile')
  })

  if (isLoading)
    return <LoaderTwo />

  return (
    <Profile id={profile.id} name={profile.name} photo={profile.photo} status={profile.status} userID={userId} />
  )
}

export default React.memo(LoadProfile)