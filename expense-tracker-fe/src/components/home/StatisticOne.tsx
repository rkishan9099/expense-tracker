/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd'
import { ColumnType } from "antd/es/table"; // Adjust the import as necessary
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { fetchStatistic1 } from '../../store/expenses/statistic.slice';
import moment from 'moment';

const StatisticOne = () => {
  const {statistic1,loading}=useAppSelector((state)=>state.statistic)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchStatistic1())
  }, [])

  const columns: ColumnType<any>[] = [
    {
        title: "User Name",
        dataIndex: "user_name",
        key: "user_name",
        render: (text) => {
            return `${text}`;
        },
    },
    {
        title: "Total Spent",
        dataIndex: "total_spent",
        key: "total_spent",
        render: (text) => {
            return `${text}`;
        },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: any) => {
          return moment(text).format("LLL");
      },
  },
];
  return (
    <div>
      <Table
        className="custom-table"
        rowKey={"id"}
        columns={columns}
        dataSource={statistic1 || []}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    </div>
  )
}

export default StatisticOne
