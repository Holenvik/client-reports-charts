export enum ChartType {
  Line = "line",
  Area = "area",
  Bar = "bar",
  Scatter = "scatter",
  Heatmap = "heatmap",
  Radar = "radar",
}

export interface FinancialReportsChart {
  reportId: number;
  chart: ChartType;
  income: Record<string, number>;
  outcome: Record<string, number>;
  id: number;
}

export type AddFinancialReportsChart = Omit<FinancialReportsChart, "id">;
export interface DeleteFinanceReportChartPayload {
  idToDelete: number;
  idToInvalidate: number;
}
