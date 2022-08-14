import { createSlice } from "@reduxjs/toolkit";
import { userData } from "./userData";

const initialState = {
   value: userData,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      add: (state, action) => {
         // Redux Toolkit allows us to write "mutating" logic in reducers. It
         // doesn't actually mutate the state because it uses the Immer library,
         // which detects changes to a "draft state" and produces a brand new
         // immutable state based off those changes
         console.log(action.payload);
         state.value.push(action.payload);
      },
      remove: (state, action) => {
         state.value.splice(
            state.value.indexOf(
               state.value.find((user) => user.id === action.payload)
            ),
            1
         );
      },
      edit: (state, action) => {
         state.value.splice(
            state.value.indexOf(
               state.value.find((user) => user.id === action.payload.id)
            ),
            1,
            action.payload
         );
      },
   },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit } = userSlice.actions;

export default userSlice.reducer;
