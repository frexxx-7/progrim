import { onValue, ref } from 'firebase/database';
import { useMemo } from 'react'

const useLoadPosts = (database, id, setPosts, setLoadingPosts) => {
  useMemo(()=> {
    const userData = ref(database, 'users/' + id + '/posts');
    onValue(userData, (snapshot) => {
      setPosts(snapshot.val())
      setLoadingPosts(false)
    });
  }, [id])
}

export default useLoadPosts