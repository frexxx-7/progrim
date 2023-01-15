import { child, push, ref, update } from 'firebase/database'

const useAddPosts = (database, id, setTextPost, textPost, author) => {
  if (textPost !== '') {
    const newPostsID = push(child(ref(database, 'users/' + id, '/posts'), ' ')).key
    update(ref(database, 'users/' + id + '/posts/' + newPostsID), {
      author: author,
      body: textPost,
      date: Date.now()
    });
    setTextPost('')
  }
}

export default useAddPosts