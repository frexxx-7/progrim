import { onValue, ref } from 'firebase/database'
import { useMemo } from 'react'

const useLoadProfile = (database, setProfile, id, setLoading) => {
  useMemo(() => {
    if (id) {
      const userData = ref(database, 'users/' + id + '/userData');
      setTimeout(() => {
        onValue(userData, (snapshot) => {
        setProfile(snapshot.val())
        setLoading && setLoading(false)
      });
      }, 100); 
    }
  }, [id])
}

export default useLoadProfile