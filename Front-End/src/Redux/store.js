import { configureStore } from "@reduxjs/toolkit";
import registerUserReducer from ".././Redux/Slice/authSlice"
import  ThemeReducer  from "../Redux/Slice/themeSlice"
import projectReducer from "../Redux/Slice/projectSlice"
import TaskReducer from "../Redux/Slice/TaskSlice"
import NotificationReducer from "../Redux/Slice/notifySlice"

export const store = configureStore({
  reducer: {
    auth:registerUserReducer,
    theme:ThemeReducer,
    project:projectReducer,
    task:TaskReducer,
    notify:NotificationReducer
  },
});