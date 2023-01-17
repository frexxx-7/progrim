import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./themeReducer";

const rootReducer = combineReducers({
  theme: themeReducer
})

export const store = configureStore({reducer: rootReducer}, composeWithDevTools())