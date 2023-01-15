import useFirebase from './useFirebase'

const useUser = () => {
  const {loadUser} = useFirebase()
  const [user] = loadUser()
  
  return user
} 

export default useUser