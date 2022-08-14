import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      currentUser: currentUserReducer,
   },
});
