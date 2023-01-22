import { SET_USER } from "./constants";

const defaultState = {
  user: {}
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}

export const setUser = (user) => ({type: SET_USER, user:user})