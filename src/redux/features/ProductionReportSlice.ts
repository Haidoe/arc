import type { ProductionReport } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProductionReportReduxProp = {
  data: ProductionReport;
};

const initialState = {
  data: {} as ProductionReport,
} as ProductionReportReduxProp;

export const productionReport = createSlice({
  name: "productionReport",
  initialState,
  reducers: {
    setProductionReport: (state, action: PayloadAction<ProductionReport>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setProductionReport } = productionReport.actions;

export default productionReport.reducer;
