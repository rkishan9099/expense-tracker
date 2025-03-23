/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Row, Skeleton, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUserDetails } from "../../store/users/user.slice";

const { Title } = Typography;

const ViewUser = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedUser: user, loading }:any = useAppSelector((state) => state.users);
    const params = useParams();

    useEffect(() => {
        if (params?.id) {
            dispatch(getUserDetails(params.id));
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
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>User Details</Title>
                </Col>
            </Row>
            <Divider />
            <div style={{ margin: "auto", padding: "20px" }}>
                {loading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : user ? (
                    <Descriptions bordered column={1}>
        
                        <Descriptions.Item label="Id">{user.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                        <Descriptions.Item label="Status">{user?.status}</Descriptions.Item>
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

export default ViewUser;
