import { Button, Collapse, notification } from "antd";
import s from "./styles.module.scss";
import {
  useAddFinanceReportMutation,
  useDeleteFinanceReportMutation,
  useGetFinanceReportsByUserIdQuery,
} from "../../redux/financialReports";
import { ClientItem } from "../../redux/clients/interfaces";
import { useMemo, useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import { Report } from "../report";
import { SpinnerWithBlur } from "../spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface Props {
  client: ClientItem;
}

export const Client = (props: Props) => {
  const { client } = props;

  const [isLoading, setIsloading] = useState(false);

  const [notificationInstance, contextHolder] = notification.useNotification();

  const {
    data = [],
    isLoading: isLoadingFinanceReportsByUserId,
    refetch: refetchFinanceReportsByUserId,
  } = useGetFinanceReportsByUserIdQuery(client.id);
  const [addReport, { isLoading: isLoadingAddFinancialReport }] =
    useAddFinanceReportMutation();
  const [deleteFinanceReport, { isLoading: isLoadingDeleteFinanceReport }] =
    useDeleteFinanceReportMutation();

  const createNewFinancialReport = async () => {
    setIsloading(true);

    try {
      const response = await addReport({
        clientId: client.id,
      });

      const haveError = Boolean(
        (response as { error?: FetchBaseQueryError })?.error
      );

      if (haveError) {
        throw new Error();
      }

      notificationInstance.success({ message: "Report was added" });

      if (!data.length) {
        await refetchFinanceReportsByUserId();
      }
    } catch (error) {
      notificationInstance.error({ message: "Error" });
    }

    setIsloading(false);
  };

  const onClickDeleteReport = async ({
    e,
    idToDelete,
    idToInvalidate,
  }: {
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>;
    idToDelete: number;
    idToInvalidate: number;
  }) => {
    e.stopPropagation();

    try {
      const response = await deleteFinanceReport({
        idToDelete,
        idToInvalidate,
      });

      const haveError = Boolean(
        (response as { error?: FetchBaseQueryError })?.error
      );

      if (haveError) {
        throw new Error();
      }

      notificationInstance.success({ message: "Report was deleted" });
    } catch (error) {
      notificationInstance.error({ message: "Error" });
    }
  };

  const reports = useMemo(
    () =>
      data.map((report) => {
        return {
          key: report.id,
          label: `Report #${report.id}`,
          children: <Report report={report} />,
          extra: (
            <CloseCircleFilled
              onClick={(e) =>
                onClickDeleteReport({
                  e,
                  idToDelete: report.id,
                  idToInvalidate: client.id,
                })
              }
            />
          ),
        };
      }),
    [data]
  );

  const shouldShowSpinner =
    isLoading ||
    isLoadingFinanceReportsByUserId ||
    isLoadingDeleteFinanceReport ||
    isLoadingAddFinancialReport;

  return (
    <div className={s.clientWrapper}>
      {contextHolder}
      {shouldShowSpinner && <SpinnerWithBlur />}

      <div className={s.clientHeader}>
        <span>Client #{client.id} reports</span>
        <Button type="primary" onClick={createNewFinancialReport}>
          Add report
        </Button>
      </div>

      <div>
        <Collapse items={reports} />
      </div>
    </div>
  );
};
