import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null,
};

export const currentUserSlice = createSlice({
   name: "currentUser",
   initialState,
   reducers: {
      update: (state, action) => {
         state.value = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { update } = currentUserSlice.actions;

export default currentUserSlice.reducer;
