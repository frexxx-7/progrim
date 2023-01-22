import { child, push, ref, update } from 'firebase/database'
import classes from '../components/Profile/Profile.module.scss'

const useAddPosts = (database, id, setTextPost, textPost, author) => {
  const input = document.getElementById('inputPosts')
  if (textPost !== '') {
    const newPostsID = push(child(ref(database, 'users/' + id, '/posts'), ' ')).key
    update(ref(database, 'users/' + id + '/posts/' + newPostsID), {
      author: author,
      body: textPost,
      date: Date.now()
    });
    setTextPost('')
    input.classList.remove(classes.errorInput)
  } else {
    input.classList.add(classes.errorInput)
  }
}

export default useAddPosts