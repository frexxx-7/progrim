import Friends from "../components/FriendsComponents/Friends/Friends"
import SearchFriends from "../components/FriendsComponents/SearchFriends"
import Messages from "../components/Messages/Messages"
import LoginPage from "../components/PagesComponents/main_loginPage/MyMainLoginPage"
import LoadProfile from "../components/Profile/LoadProfile"
import Autorization from "../pages/Autorization"
import Registration from "../pages/Registration"

export const privateRoutes = [
  {
    path: `/profile/:id`,
    component: <LoginPage
      ComponentCh={<LoadProfile />}
    />
  },
  {
    path: `/messages`,
    component: <LoginPage
      ComponentCh={<Messages />}
    />
  },
  {
    path: `/friends/search`,
    component: <LoginPage
      ComponentCh={<Friends
        ComponentCh={<SearchFriends />}
      />}
    />
  }
]

export const publicRoutes = [
  { path: '/autorization', component: Autorization },
  { path: '/registration', component: Registration }
]