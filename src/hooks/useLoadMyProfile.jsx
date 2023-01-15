import { onValue, ref } from 'firebase/database'
import { useMemo } from 'react'
import useFirebase from './useFirebase'

const useLoadMyProfile = (setMyProfile, id) => {
  const { database} = useFirebase()

  useMemo(() => {
    if (id) {
      const userData = ref(database, 'users/' + id + '/userData');
      onValue(userData, (snapshot) => {
        setMyProfile(snapshot.val())
      });
    }
  }, [id])
}

export default useLoadMyProfile