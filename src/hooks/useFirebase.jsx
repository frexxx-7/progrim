import { useContext } from 'react'
import { FirebaseContext } from '../providers/FirebaseProvider'

const useFirebase = () => {
  const value = useContext(FirebaseContext)

  return value
}

export default useFirebase