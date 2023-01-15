import React, { createContext, useMemo, useState } from 'react'
import useFirebase from '../hooks/useFirebase'

export const UserContext = createContext({
  user: '',
  editUser:()=>{}
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  console.log(user);

  const editUser = (userE) => {
    setUser(userE)
  }

  const value = useMemo(() => ({
    user,
    editUser: editUser
  }), [])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider