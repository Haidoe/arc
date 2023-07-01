import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
