import { combineReducers } from "redux";
import rootSlice from "./rootSlice";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  root: rootSlice,
});

export const store = configureStore({
  reducer,
});
