/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Row, Skeleton, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getExpenseDetails } from "../../store/expenses/expenses.slice";

const { Title } = Typography;

const EditExpense = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedExpense: expense, loading } = useAppSelector((state) => state.expenses);
    const params = useParams();

    useEffect(() => {
        if (params?.id) {
            dispatch(getExpenseDetails(params.id));
        }
    }, [params?.id]);

    return (
        <>
            <Row align="middle">
                <Col>
                    <Button
                        icon={<LeftOutlined />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Col>
                <Col flex="auto">
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>Expense Details</Title>
                </Col>
            </Row>
            <Divider />
            <div style={{ margin: "auto", padding: "20px" }}>
                {loading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : expense ? (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="User">
                            {expense.user_name} ({expense.email})
                        </Descriptions.Item>
                        <Descriptions.Item label="Category">{expense.category_name}</Descriptions.Item>
                        <Descriptions.Item label="Amount">₹{parseFloat(expense.amount).toFixed(2)}</Descriptions.Item>
                        <Descriptions.Item label="Date">{new Date(expense.date).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item label="Description">{expense.description}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{new Date(expense.created_at).toLocaleString()}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <Typography.Text type="danger" style={{ display: "block", textAlign: "center", padding: "10px" }}>
                        Expense details not found.
                    </Typography.Text>
                )}
            </div>
        </>

    );
};

export default EditExpense;
