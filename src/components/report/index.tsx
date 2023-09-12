import { Button, notification } from "antd";

import { FinancialReport } from "../../redux/financialReports/interfaces";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import { SpinnerWithBlur } from "../spinner";
import s from "./style.module.scss";
import {
  useAddFinanceReportChartMutation,
  useDeleteFinanceReportChartMutation,
  useGetFinanceReportChartsByReportIdQuery,
} from "../../redux/financialReportsCharts";
import { getRandomChartType, getRandomPieceOfDataWithDates } from "./helpers";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { DeleteFinanceReportChartPayload } from "../../redux/financialReportsCharts/interfaces";

const Chart = lazy(() => import("../chart"));

interface Props {
  report: FinancialReport;
}

export const Report = (props: Props) => {
  const { report } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [notificationInstance, contextHolder] = notification.useNotification();

  const {
    data = [],
    isLoading: isLoadingFinanceReportChartsByReportId,
    refetch: refetchFinanceReportChartsByReportId,
  } = useGetFinanceReportChartsByReportIdQuery(report.id);
  const [addFinanceReportChart, { isLoading: isLoadingAddFinanceReportChart }] =
    useAddFinanceReportChartMutation();
  const [
    deleteFinanceReportChart,
    { isLoading: isLoadingDeleteFinanceReportChart },
  ] = useDeleteFinanceReportChartMutation();

  const createReportChart = async () => {
    setIsLoading(true);

    try {
      const response = await addFinanceReportChart({
        reportId: report.id,
        outcome: getRandomPieceOfDataWithDates(),
        income: getRandomPieceOfDataWithDates(),
        chart: getRandomChartType(),
      });

      const haveError = Boolean(
        (response as { error?: FetchBaseQueryError })?.error
      );

      if (haveError) {
        throw new Error();
      }

      notificationInstance.success({ message: "Report was added" });

      if (!data.length) {
        await refetchFinanceReportChartsByReportId();
      }
    } catch (error) {
      notificationInstance.error({ message: "Error" });
    }

    setIsLoading(false);
  };

  const deleteReportChart = useCallback(
    async (payload: DeleteFinanceReportChartPayload) => {
      try {
        const response = await deleteFinanceReportChart(payload);

        const haveError = Boolean(
          (response as { error?: FetchBaseQueryError })?.error
        );

        if (haveError) {
          throw new Error();
        }

        notificationInstance.success({ message: "Chart was deleted" });
      } catch (error) {
        notificationInstance.error({ message: "Error" });
      }
    },
    []
  );

  const renderCharts = useMemo(
    () =>
      data.map((chart) => (
        <Chart
          data={chart}
          key={chart.id}
          deleteReportChart={deleteReportChart}
        />
      )),
    [data]
  );

  const shouldShowSpinner =
    isLoading ||
    isLoadingFinanceReportChartsByReportId ||
    isLoadingAddFinanceReportChart ||
    isLoadingDeleteFinanceReportChart;

  return (
    <div className={s.reportWrapper}>
      {shouldShowSpinner && <SpinnerWithBlur />}
      {contextHolder}

      <div className={s.reportHeader}>
        <span>Report #{report.id}</span>
        <Button type="primary" onClick={createReportChart}>
          Add data
        </Button>
      </div>

      <Suspense fallback={<SpinnerWithBlur />}>
        <div className={s.reportChartsWrapper}>{renderCharts}</div>
      </Suspense>
    </div>
  );
};
