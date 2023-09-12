import { ChartType } from "../../redux/financialReportsCharts/interfaces";
import { DATES_TO_CREATE_NEW_REPORT } from "./constants";

export const getRandomPieceOfDataWithDates = () => {
  const MIN = 1;
  const MAX = 10000;

  return DATES_TO_CREATE_NEW_REPORT.reduce((acc, date) => {
    return {
      ...acc,
      [date]: Math.floor(Math.random() * (MAX - MIN + 1)) + MIN,
    };
  }, {});
};

export const getRandomChartType = () => {
  const chartTypes = Object.values(ChartType);
  const randomIndex = Math.floor(Math.random() * chartTypes.length);
  return chartTypes[randomIndex] as ChartType;
};
