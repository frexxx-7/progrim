import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '../router/routes'
import MyProfile from "../components/Profile/MyProfile"
import LoginPage from './PagesComponents/main_loginPage/MyMainLoginPage'
import Friends from './FriendsComponents/Friends/Friends'
import FriendsList from './FriendsComponents/FriendsList'
import useUser from '../hooks/useUser'
import SearchFriends from "./FriendsComponents/SearchFriends"
import Messages from "./MessagesComponents/Messages/Messages"
import LoadProfile from "./Profile/LoadProfile"
import ChatsImage from './MessagesComponents/ChatsImage'
import OpenMessages from './MessagesComponents/OpenMessages/OpenMessages'
import Progrim from './PagesComponents/Progrim/Progrim'
import Rules from './PagesComponents/Rules/Rules'
import Developers from './PagesComponents/Developers/Developers'

const AppRouter = () => {
  const user = useUser()

  return (
    user
      ?
      <Routes>

        <Route path='/profile' element={<LoginPage
          ComponentCh={<MyProfile user={user} />}
        />} />

        <Route path='/friends' element={<LoginPage
          ComponentCh={<Friends
            ComponentCh={<FriendsList
              id={user.uid}
            visibleSearch={false}
            />}
          />}
        />} />

        <Route path='/friends/search' element={<LoginPage
          ComponentCh={<Friends
            ComponentCh={<SearchFriends idUser={user.uid} />}
          visibleSearch={true}
          />}
        />} />

        <Route path='/messages' element={<LoginPage
          ComponentCh={<Messages userId={user.uid} ComponetCh={<ChatsImage />} />}
        />} />

        <Route path='/messages/:id' element={<LoginPage
          ComponentCh={<Messages userId={user.uid} ComponetCh={<OpenMessages idUser={user.uid} />} />}
        />} />

        <Route path='/profile/:id' element={<LoginPage
          ComponentCh={<LoadProfile userId={user.uid} />}
        />} />


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
        <Route path="/progrim" element={<Progrim/>} />
        <Route path="/rules" element={<Rules/>} />
        <Route path="/developers" element={<Developers/>} />
        <Route path="*" element={<Navigate to="/autorization" />} />
      </Routes>
  )
}

export default React.memo(AppRouter)