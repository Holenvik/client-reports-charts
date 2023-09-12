import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import {
  AddFinancialReportPayload,
  DeleteFinanceReportPayload,
  FinancialReport,
} from "./interfaces";

export const financialReport = createApi({
  reducerPath: "financialReport",
  tagTypes: ["financialReport"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getFinanceReportsByUserId: build.query<FinancialReport[], number>({
      query: (clientId) => `financialReport?${`clientId=${clientId}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ clientId }) => ({
                type: "financialReport" as const,
                id: clientId,
              })),
              "financialReport",
            ]
          : [{ type: "financialReport", id: "LIST" }],
    }),
    addFinanceReport: build.mutation<
      FinancialReport,
      AddFinancialReportPayload
    >({
      query: (body: AddFinancialReportPayload) => ({
        url: "financialReport",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result) => {
        return [{ type: "financialReport", id: result?.clientId }];
      },
    }),
    deleteFinanceReport: build.mutation({
      query: (body: DeleteFinanceReportPayload) => ({
        url: `financialReport/${body.idToDelete}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "financialReport", id: arg.idToInvalidate },
      ],
    }),
  }),
});

export const {
  useGetFinanceReportsByUserIdQuery,
  useAddFinanceReportMutation,
  useDeleteFinanceReportMutation,
} = financialReport;
