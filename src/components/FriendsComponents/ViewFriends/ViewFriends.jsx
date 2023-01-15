import React from 'react'
import FriendsList from '../FriendsList'

const ViewFriends = ({id}) => {
  return (
    <FriendsList id={id} deleteFr={false}/>
  )
}

export default ViewFriends