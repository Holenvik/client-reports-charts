export interface FinancialReport {
  id: number;
  clientId: number;
}

export type AddFinancialReportPayload = Omit<FinancialReport, "id">;
export interface DeleteFinanceReportPayload {
  idToDelete: number;
  idToInvalidate: number;
}
