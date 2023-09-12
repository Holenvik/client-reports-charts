import { Spin } from "antd";
import s from "./style.module.scss";

export const SpinnerWithBlur = () => {
  return (
    <div className={s.spinnerWrapper}>
      <Spin />
    </div>
  );
};
