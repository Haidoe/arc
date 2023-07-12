import type {
  Rolls,
  ProductionReport,
  Extras,
  CastTimeLog,
  Scenes,
  scheduleForDay,
} from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ProductionReportReduxProp = {
  data: ProductionReport;
};

const initialState = {
  data: {
    scheduleForDay: {
      breakfastFrom: null,
      breakfastTo: null,
      crewCallFrom: null,
      crewCallTo: null,
      shootingCallFrom: null,
      shootingCallTo: null,
      lunchFrom: null,
      lunchTo: null,
    },
    startDate: null,
    actualSchedule: {
      firstUnitInput: {
        schedule: null,
        actual: null,
      },
      secondUnitInput: {
        schedule: null,
        actual: null,
      },
      prep: {
        schedule: null,
        actual: null,
      },
      travel: {
        schedule: null,
        actual: null,
      },
      idle: {
        schedule: null,
        actual: null,
      },
      holiday: {
        schedule: null,
        actual: null,
      },
    },
    rolls: Array<Rolls>(),
    extras: Array<Extras>(),
    castTimeLog: Array<CastTimeLog>(),
    shotScene: Array<Scenes>(),
  } as ProductionReport,
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
    updateScheduleForDay: (state, action: PayloadAction<scheduleForDay>) => {
      state.data = {
        ...state.data,
        scheduleForDay: {
          ...action.payload,
        },
      };
    },
  },
});

export const { setProductionReport, updateScheduleForDay } =
  productionReport.actions;

export default productionReport.reducer;
