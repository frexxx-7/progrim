import {useState } from 'react'

const useUser = (users) => {
  //const value = useContext(UserContext)
  //console.log(value)
  //return value
  const [user, setUser] = useState({})
  const editUser = () => {
    setUser(users)
  }
  console.log(user)

  if (users) {
    return editUser
  }
  return user
} 

export default useUser