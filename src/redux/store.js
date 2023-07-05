import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/CounterSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
