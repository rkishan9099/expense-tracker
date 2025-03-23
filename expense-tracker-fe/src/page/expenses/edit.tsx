/* eslint-disable react-hooks/exhaustive-deps */
import { LeftOutlined } from '@ant-design/icons'
import { Row, Col, Button, Divider, Typography } from 'antd'
import { useEffect } from 'react'
import AddEditExpensesForm from '../../components/expenses/AddEditExpensesForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { getExpenseDetails } from '../../store/expenses/expenses.slice'
const { Title } = Typography;

const EditExpense = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()


    const params = useParams()
    console?.debug("dd",params)

    useEffect(()=>{
        if(params?.id){
            dispatch(getExpenseDetails(params?.id))
        }
    },[params?.id])



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
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>Edit Expense</Title>
                </Col>
            </Row>
            <Divider />
            <AddEditExpensesForm id={params?.id}/>
        </>
    )
}

export default EditExpense
