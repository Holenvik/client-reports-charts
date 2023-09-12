import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import {
  AddFinancialReportsChart,
  DeleteFinanceReportChartPayload,
  FinancialReportsChart,
} from "./interfaces";

export const financialReportCharts = createApi({
  reducerPath: "financialReportChartsChart",
  tagTypes: ["financialReportCharts"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getFinanceReportChartsByReportId: build.query<
      FinancialReportsChart[],
      number
    >({
      query: (reportId) => `financialReportCharts?${`reportId=${reportId}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ reportId }) => ({
                type: "financialReportCharts" as const,
                id: reportId,
              })),
              "financialReportCharts",
            ]
          : [{ type: "financialReportCharts", id: "LIST" }],
    }),
    addFinanceReportChart: build.mutation<
      FinancialReportsChart,
      AddFinancialReportsChart
    >({
      query: (body) => ({
        url: "financialReportCharts",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result) => {
        return [{ type: "financialReportCharts", id: result?.reportId }];
      },
    }),
    deleteFinanceReportChart: build.mutation({
      query: (body: DeleteFinanceReportChartPayload) => ({
        url: `financialReportCharts/${body.idToDelete}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "financialReportCharts", id: arg.idToInvalidate },
      ],
    }),
  }),
});

export const {
  useAddFinanceReportChartMutation,
  useDeleteFinanceReportChartMutation,
  useGetFinanceReportChartsByReportIdQuery,
} = financialReportCharts;
