import { Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTableList } from "../api/flows";

export const Demo = () => {
  const [data, setData] = useState([]);

  const getTable = useCallback(async () => {
    const results = await getTableList();

    setData(results);
  }, []);

  useEffect(() => {
    getTable();
  }, [getTable]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      render: (text: string) => <Link to={`/flow/${text}`}>{text}</Link>,
    },
    {
      dataIndex: "code",
      title: "code",
    },
    {
      dataIndex: "name",
      title: "name",
    },
    {
      dataIndex: "description",
      title: "description",
    },
    {
      dataIndex: "platform",
      title: "platform",
    },

    {
      dataIndex: "version",
      title: "version",
    },
    {
      dataIndex: "created_at",
      title: "created_at",
    },
    {
      dataIndex: "created_by",
      title: "created_by",
    },
    {
      dataIndex: "updated_at",
      title: "updated_at",
    },
    {
      dataIndex: "updated_by",
      title: "updated_by",
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};
