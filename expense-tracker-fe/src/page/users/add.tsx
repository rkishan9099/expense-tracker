import { Typography, Divider, Button, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddEditUsersForm from "../../components/users/AddEditUsersForm";

const { Title } = Typography;

const AddUsers = () => {
  const navigate = useNavigate();


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
          <Title level={2} style={{ margin: '0 0 0 16px' }}>Add User</Title>
        </Col>
      </Row>
      <Divider />
      <AddEditUsersForm />
    </>
  );
};

export default AddUsers;
