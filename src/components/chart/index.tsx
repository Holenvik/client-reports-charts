import ReactApexChart from "react-apexcharts";
import {
  DeleteFinanceReportChartPayload,
  FinancialReportsChart,
} from "../../redux/financialReportsCharts/interfaces";
import { CloseCircleFilled } from "@ant-design/icons";
import s from "./style.module.scss";

interface Props {
  data: FinancialReportsChart;
  deleteReportChart: (payload: DeleteFinanceReportChartPayload) => void;
}

const Chart = (props: Props) => {
  const { data, deleteReportChart } = props;

  const incomeData = Object.values(data.income);
  const outcomeData = Object.values(data.outcome);
  const categories = Object.keys(data.income);

  const chartData = {
    options: {
      chart: {
        id: String(data.id),
      },
      xaxis: {
        categories,
      },
    },
    series: [
      {
        name: "Income",
        data: incomeData,
      },
      {
        name: "Outcome",
        data: outcomeData,
      },
    ],
  };

  const onClickDeleteReportChart = () => {
    deleteReportChart({ idToDelete: data.id, idToInvalidate: data.reportId });
  };

  return (
    <div className={s.chartWrapper}>
      <div className={s.chartCloseIconWrapper}>
        <CloseCircleFilled onClick={onClickDeleteReportChart} />
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type={data.chart}
        height="300"
        width="300"
      />
    </div>
  );
};

export default Chart;
