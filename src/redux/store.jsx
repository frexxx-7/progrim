import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./themeReducer";
import { userReducer } from "./userReducer";
import { searchQueryReducer } from "./searchQueryReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  searchQuery: searchQueryReducer
})

export const store = configureStore({reducer: rootReducer}, composeWithDevTools())