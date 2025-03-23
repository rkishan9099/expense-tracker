/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { useEffect } from 'react'
import { fetchStatistic3 } from '../../store/expenses/statistic.slice'
import { useAppSelector, useAppDispatch } from '../../store/store'

const StatisticThree = () => {
  const { statistic3, loading } = useAppSelector((state) => state.statistic)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchStatistic3())
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
      title: "Last Recorded Month",
      dataIndex: "last_recorded_month",
      key: "last_recorded_month",
      render: (text) => {
        return `${text}`;
      },
    },
    {
      title: "Last Month Spending",
      dataIndex: "last_month_spending",
      key: "last_month_spending",
      render: (text) => {
        return `${text}`;
      },
    },
    {
      title: "lLst 3 Month Average",
      dataIndex: "last_3_months_average",
      key: "last_3_months_average",
      render: (text) => {
        return `${text}`;
      },
    },
    {
      title: "Predicted Month",
      dataIndex: "predicted_month",
      key: "predicted_month",
      render: (text) => {
        return `${text}`;
      },
    },
    {
      title: "Predicted Spending",
      dataIndex: "predicted_spending",
      key: "predicted_spending",
      render: (text) => {
        return `${text}`;
      },
    }

  ];
  return (
    <div>
      <Table
        className="custom-table"
        rowKey={"id"}
        columns={columns}
        dataSource={statistic3 || []}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    </div>
  )
}

export default StatisticThree
