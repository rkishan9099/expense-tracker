/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCategories } from "../../store/category/category.slice";
import { fetchUsers } from "../../store/users/user.slice";
import { addExpenses, editExpenses } from "../../store/expenses/expenses.slice";
import { ApiResponse, ApiStatus } from "../../type/app.type";
import { useNavigate } from "react-router-dom";
import APP_PATH from "../../routes/app-path";
import toast from "react-hot-toast";

const { Option } = Select;

type PropsType = {
  id?: string;
};

const AddEditExpensesForm: React.FC<PropsType> = ({ id }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  const { category } = useAppSelector((state) => state.category);
  const { users } = useAppSelector((state) => state.users);
  const { selectedExpense } = useAppSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id && selectedExpense) {
      form.setFieldsValue({
        ...selectedExpense,
        date: selectedExpense?.date ? dayjs(selectedExpense?.date) : null, // ✅ Fix DatePicker
      });
    }
  }, [id, selectedExpense, form]);

  const handleSubmit = async (values: any) => {
    const data = {
      ...values,
      user_id:values?.user_id?.toString(),
      category_id:values?.category_id?.toString(),
      date: values.date ? values.date.toISOString() : null, // ✅ Fix Date Format
    };

    if (id) {
      const res: ApiResponse = await editExpenses(id, data)
      if (res.status === ApiStatus.success) {
        return navigate(APP_PATH.expenses.list)
      } else {
        toast.error(res.message)
      }
      return null
    } else {
      const res: ApiResponse = await addExpenses(data)
      if (res.status === ApiStatus.success) {
        return navigate(APP_PATH.expenses.list)
      } else {
        toast.error(res.message)
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        user_id: "4",
        category_id: "4",
        amount: "1500",
        date: dayjs("2024-02-22"),
        description: "Grocery shopping",
      }}
    >
      {/* User and Category in one row */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="User" name="user_id" rules={[{ required: true }]}>
            <Select placeholder="Select User">
              {users?.map((user: any) => (
                <Option value={user.id} key={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Category" name="category_id" rules={[{ required: true }]}>
            <Select placeholder="Select Category">
              {category?.map((row: any) => (
                <Option value={row.id} key={row.id}>
                  {row.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Amount and Date in one row */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Amount is required" }]}>
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} placeholder="Enter description" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditExpensesForm;
