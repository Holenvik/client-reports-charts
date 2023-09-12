import { configureStore } from "@reduxjs/toolkit";
import { clients } from "./clients";
import { financialReport } from "./financialReports";
import { financialReportCharts } from "./financialReportsCharts";

export const store = configureStore({
  reducer: {
    [clients.reducerPath]: clients.reducer,
    [financialReport.reducerPath]: financialReport.reducer,
    [financialReportCharts.reducerPath]: financialReportCharts.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(
      clients.middleware,
      financialReport.middleware,
      financialReportCharts.middleware
    ),
});
