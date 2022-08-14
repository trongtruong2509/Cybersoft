import { createSlice } from "@reduxjs/toolkit";

export const seatSlice = createSlice({
    name: "seats",
    initialState: { value: [] },
    reducers: {
        add: (state, actions) => {
            console.log("Enter add func and payload: " + actions.payload);
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value.push(actions.payload);
        },
        remove: (state, actions) => {
            console.log("Enter remove func");

            state.value = state.value.filter(
                (seat) => seat !== actions.payload
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { add, remove } = seatSlice.actions;

export default seatSlice.reducer;
