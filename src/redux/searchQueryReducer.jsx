import { CHAGE_SEARCH_QUERY } from "./constants";

const defaultState = {
  searchQuery: ''
}

export const searchQueryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHAGE_SEARCH_QUERY:
      return {...state, searchQuery: action.searchQuery}
    default:
      return state
  }
}

export const setSearchQuery = (searchQuery) => ({type: CHAGE_SEARCH_QUERY, searchQuery:searchQuery})