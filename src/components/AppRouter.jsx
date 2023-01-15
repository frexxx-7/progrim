import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/routes'
import useFirebase from '../hooks/useFirebase'
import useLoadMyProfile from '../hooks/useLoadMyProfile'
import MyProfile from "../components/Profile/MyProfile"
import LoginPage from './PagesComponents/main_loginPage/MyMainLoginPage'
import Friends from './FriendsComponents/Friends/Friends'
import FriendsList from './FriendsComponents/FriendsList'


const AppRouter = () => {
  const [myProfile, setMyProfile] = useState({})

  const {loadUser} = useFirebase()
  const [user] = loadUser()
  
  user && useLoadMyProfile(setMyProfile, user.uid)

  return (
    user
      ?
      <Routes>
        <Route path='/profile' element={<LoginPage
          ComponentCh={<MyProfile
            id={myProfile.id}
            name={myProfile.name}
            photo={myProfile.photo}
            status={myProfile.status}
            date={user.metadata.creationTime}
          />}
        />} />
        <Route path='/friends' element={<LoginPage
          ComponentCh={<Friends
            ComponentCh={<FriendsList
              id={user.uid}
            />}
          />}
        />} />
        {privateRoutes.map((route, index) =>
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        )}

        <Route path="*" element={<Navigate to={`/profile`} />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map((route, index) =>
          <Route
            path={route.path}
            element={<route.component />}
            key={index}
          />
        )}

        <Route path="*" element={<Navigate to="/autorization" />} />
      </Routes>
  )
}

export default AppRouter