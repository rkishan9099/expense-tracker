/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import  { useEffect } from 'react'
import { fetchStatistic2 } from '../../store/expenses/statistic.slice'
import { useAppSelector, useAppDispatch } from '../../store/store'

const StatisticTwo = () => {
  const { statistic2, loading } = useAppSelector((state) => state.statistic)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchStatistic2())
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
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (text) => {
        return `${text}`;
      },
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
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
      title: "Prev Month Spent",
      dataIndex: "previous_month_spent",
      key: "previous_month_spent",
      render: (text) => {
        return `${text || 0}`;
      },
    },
    {
      title: "Percentage Change",
      dataIndex: "percentage_change",
      key: "percentage_change",
      render: (text) => {
        return `${text || 0}%`;
      },
    },
  ];
  return (
    <div>
      <Table
        className="custom-table"
        rowKey={"id"}
        columns={columns}
        dataSource={statistic2 || []}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    </div>
  )
}

export default StatisticTwo
