/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCategories } from "../../store/category/category.slice";
import { addUser, editUser, fetchUsers } from "../../store/users/user.slice";
import { ApiResponse, ApiStatus } from "../../type/app.type";
import { useNavigate } from "react-router-dom";
import APP_PATH from "../../routes/app-path";
import toast from "react-hot-toast";

type PropsType = {
  id?: string;
};

const AddEditUsersForm: React.FC<PropsType> = ({ id }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedUser }: any = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id && selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
      });
    }
  }, [id, selectedUser, form]);

  const handleSubmit = async (values: any) => {
    const data = {
      ...values
    };

    if (id) {
      const res: ApiResponse = await editUser(id, data);
      if (res.status === ApiStatus.success) {
        return navigate(APP_PATH.users.list);
      } else {
        toast.error(res.message);
      }
      return null;
    } else {
      const res: ApiResponse = await addUser(data);
      if (res.status === ApiStatus.success) {
        return navigate(APP_PATH.users.list);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
        <Input type="text" placeholder="Enter Name" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]}>
        <Input type="email" placeholder="Enter Email" />
      </Form.Item>

      {/* ✅ Added Status Field */}
      <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status is required" }]}>
        <Select placeholder="Select Status">
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditUsersForm;
