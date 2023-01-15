import { onValue, ref } from 'firebase/database';
import { useMemo } from 'react'

const useLoadFriends = (database, id, setFriend, setLoadingFriend) => {
  useMemo(() => {
    const userData = ref(database, 'users/' + id + '/friends');
    onValue(userData, (snapshot) => {
      setFriend(snapshot.val())
      setLoadingFriend(false)
    });
  }, [id])
}

export default useLoadFriends