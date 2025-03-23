import AddEditExpensesForm from "../../components/expenses/AddEditExpensesForm";
import { Typography, Divider, Button, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AddExpenses = () => {
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
          <Title level={2} style={{ margin: '0 0 0 16px' }}>Add Expense</Title>
        </Col>
      </Row>
      <Divider />
      <AddEditExpensesForm />
    </>
  );
};

export default AddExpenses;
