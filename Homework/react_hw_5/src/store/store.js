import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      search: searchReducer,
      currentUser: currentUserReducer,
   },
});
