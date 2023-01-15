import LoginPage from "../pages/LoginPage"
import Autorization from "../pages/Autorization"
import Registration from "../pages/Registration"
import LoadProfile from "../components/LoadProfile"
import Messages from "../components/Messages/Messages"
import Friends from "../components/Friends/Friends"
import SearchFriends from "../components/SearchFriends"

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