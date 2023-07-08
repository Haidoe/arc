import { configureStore } from "@reduxjs/toolkit";
import productionReportReducer from "./features/ProductionReportSlice";

const store = configureStore({
  reducer: {
    productionReport: productionReportReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
