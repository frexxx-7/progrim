import React from 'react'
import PostItem from '../PostItem/PostItem'

const PostsList = ({ posts, deleteTr, userId }) => {
  return (
    <div>
      {!posts
        ? <h2>No posts</h2>
        : posts.map(([key, value]) => (
          <PostItem key={key} idPost={key} author={value.author} body={value.body} date={value.date} deleteTr={deleteTr} userId={userId} />
        ))
      }
    </div>
  )
}

export default React.memo(PostsList)