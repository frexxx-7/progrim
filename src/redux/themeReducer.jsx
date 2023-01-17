import { CHANGE_THEME } from "./constants"

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

const defaultState = {
  theme: localStorage.getItem('app-theme') || defaultTheme
}

export const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.theme }
    default:
      return state
  }
}

export const changeThemes = (theme) => ({type:CHANGE_THEME, theme:theme})