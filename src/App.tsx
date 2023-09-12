import { useMemo, useState } from "react";

import { Button, Collapse, Input, notification } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { Client } from "./components/client";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
} from "./redux/clients";
import { generateRandomName } from "./helpers";
import s from "./style.module.scss";
import { SpinnerWithBlur } from "./components/spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const { Search } = Input;

const App = () => {
  const [searchText, setSearchText] = useState("");

  const [notificationInstance, contextHolder] = notification.useNotification();

  const { data = [], isLoading } = useGetClientsQuery(searchText);
  const [deleteClient, { isLoading: isLoadingDeleteClientMutation }] =
    useDeleteClientMutation();
  const [addClient, { isLoading: isLoadingAddClient }] = useAddClientMutation();

  const onClickDeleteClient = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    try {
      const response = await deleteClient(id);

      const haveError = Boolean(
        (response as { error?: FetchBaseQueryError })?.error
      );

      if (haveError) {
        throw new Error();
      }

      notificationInstance.success({ message: "Client was deleted" });
    } catch (error) {
      notificationInstance.error({ message: "Error" });
    }
  };

  const onClickAddClient = async () => {
    try {
      const response = await addClient({ name: generateRandomName() });

      const haveError = Boolean(
        (response as { error?: FetchBaseQueryError })?.error
      );

      if (haveError) {
        throw new Error();
      }

      notificationInstance.success({ message: "Client was added" });
    } catch (error) {
      notificationInstance.error({ message: "Error" });
    }
  };

  const clients = useMemo(
    () =>
      data.map((client) => {
        return {
          key: client.id,
          label: client.name,
          children: <Client client={client} />,
          extra: (
            <CloseCircleFilled
              onClick={(e) => onClickDeleteClient(e, client.id)}
            />
          ),
        };
      }),
    [data]
  );

  const shouldShowSpiner =
    isLoadingDeleteClientMutation || isLoading || isLoadingAddClient;

  return (
    <div className={s.appWrapper}>
      {shouldShowSpiner && <SpinnerWithBlur />}
      {contextHolder}

      <div className={s.appHeader}>
        <Button type="primary" onClick={onClickAddClient}>
          New Client
        </Button>

        <Search
          placeholder="Client search"
          allowClear
          onSearch={(value) => setSearchText(value)}
          className={s.appHeaderSearch}
        />
      </div>

      <Collapse items={clients} />
    </div>
  );
};

export default App;
