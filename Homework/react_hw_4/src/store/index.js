import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "./seatSlice";

export const store = configureStore({
    reducer: {
        seats: seatsReducer,
    },
});
