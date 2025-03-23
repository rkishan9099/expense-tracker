/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {  useAppDispatch, useAppSelector } from "../../store/store";
import { addCategory, editCategory, fetchCategories } from "../../store/category/category.slice";
import { ApiResponse, ApiStatus } from "../../type/app.type";
import toast from "react-hot-toast";
import { Button, Form, Input, Modal } from "antd";

type PropsType = {
  visible: boolean;
  onClose: () => void;
  id?: string;
};

const CategoryModal: React.FC<PropsType> = ({ visible, onClose, id }) => {
  const [form] = Form.useForm();
  const { selectedCategory }: any = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (id && selectedCategory) {
      form.setFieldsValue({
        ...selectedCategory,
      });
    } else {
      form.resetFields(); // Reset form when adding new category
    }
  }, [id, selectedCategory, form]);

  const handleSubmit = async (values: any) => {
    const data = {
      ...values,
      status: values.status || "active", // Default to active
    };

    let res: ApiResponse;
    if (id) {
      res = await editCategory(id, data);
    } else {
      res = await addCategory(data);
    }

    if (res.status === ApiStatus.success) {
      toast.success(id ? "Category updated successfully" : "Category added successfully");
      onClose(); // Close modal
      dispatch(fetchCategories())
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Modal
      title={id ? "Edit Category" : "Add Category"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Category name is required" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {id ? "Update Category" : "Add Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
