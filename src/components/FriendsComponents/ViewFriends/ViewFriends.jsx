import React from 'react'
import FriendsList from '../FriendsList'

const ViewFriends = ({id, setVisible}) => {
  return (
    <FriendsList id={id} deleteFr={false} setVisible={setVisible}/>
  )
}

export default ViewFriends