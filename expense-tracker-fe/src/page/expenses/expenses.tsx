/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Table,
    Button,
    Dropdown,
    Tag,
    Modal,
    notification,
    Typography,
    Divider
} from "antd";
import { DownOutlined, ExclamationCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, InputRef } from "antd"; // Ensure this import is correct
import { ColumnType } from "antd/es/table"; // Adjust the import as necessary
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteExpenses, fetchExpenses } from "../../store/expenses/expenses.slice";
import { Link, useNavigate } from "react-router-dom";
import APP_PATH from "../../routes/app-path";
import toast from "react-hot-toast";
import { ApiStatus } from "../../type/app.type";
import { fetchCategories } from "../../store/category/category.slice";
import { fetchUsers } from "../../store/users/user.slice";
import FilterComponent from "../../components/expenses/FilterComponent";

const { Title } = Typography

const ExpensesPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const searchInput = useRef<InputRef | null>(null);

    const [deleteId, setDeleteId] = useState("")
    const navigate = useNavigate()
    const [filters, setFilters] = useState<any>({
    });

    const { expenses, loading } = useAppSelector(
        (state) => state.expenses
    );
    const { users } = useAppSelector(
        (state) => state.users
    );

    const { category } = useAppSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchUsers())
        dispatch(fetchExpenses({}))
    }, [])


;

    const handleSearch = () => {
        const params:any={}
        if(filters?.email && filters?.email.length > 0){
          params["email"]=filters?.email[0]
        }

        dispatch(fetchExpenses(params));
    };
    const handleReset = async (dataIndex: string) => {
        const applyfilters: any = filters;
        delete applyfilters[dataIndex];
        setFilters(applyfilters);

        dispatch(fetchExpenses());
    };

    const getColumnSearchProps = (dataIndex: string): any => {
        return {
            filterDropdown: ({ }: any) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(node) => {
                            searchInput.current = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={filters[dataIndex] || ""}
                        onChange={(e) =>
                            setFilters({ ...filters, [dataIndex]: [e.target.value] })
                        }
                        onPressEnter={() => handleSearch()}
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value: string | number | boolean, record: any) => {
                const recordValue = record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase()
                    : "";
                return recordValue.includes(value.toString().toLowerCase());
            },
            onFilterDropdownOpenChange: (visible: boolean) => {
                if (visible && searchInput.current) {
                    searchInput.current.focus();
                }
            },
            render: (text: string) =>
                filters[dataIndex] && Array.isArray(filters[dataIndex]) ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[filters[dataIndex][0]]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        };
    };

    const handleChange = (pagination: any, Tablefilters: any) => {
        let applyFilters: any = {};
        if (Array.isArray(Tablefilters?.user_name) && Tablefilters.user_name.length > 0) {
            applyFilters.users = Tablefilters.user_name;
        }

        if (Array.isArray(Tablefilters?.category_name) && Tablefilters.category_name.length > 0) {
            applyFilters.category = Tablefilters.category_name;
        }


        setFilters(Tablefilters);
        dispatch(fetchExpenses(applyFilters));
    };

    const hanleConfirmDelete = async () => {
        if (deleteId) {
            const res = await deleteExpenses(deleteId)
            if (res.status == ApiStatus.success) {
                setDeleteId("")
                toast.success(res.message)
                dispatch(fetchExpenses())
            } else {
                toast.error(res.message)
            }
        } else {
            toast.error("Select Expense for Delete")
        }
    }

    const userFilter = useMemo(() => {
        return users?.map((user: any) => {
            return {
                text: user?.name,
                value: user?.id
            }
        })
    }, [users])


    const categoryFilter = useMemo(() => {
        return category?.map((user: any) => {
            return {
                text: user?.name,
                value: user?.id
            }
        })
    }, [category])


    const columns: ColumnType<any>[] = [
        {
            title: "User Name",
            dataIndex: "user_name",
            key: "user_name",
            filters: userFilter,
            filteredValue: filters.user_name || null,
            onFilter: (value: string, record) => record.user_id === value,
            filterSearch: true,
            render: (text) => {
                return `${text}`;
            },
            // ...getColumnSearchProps("user_name"),
        },
        {
            title: "User Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },

        {
            title: "Category Name",
            dataIndex: "category_name",
            key: "category_name",
            filters: categoryFilter,
            filteredValue: filters.category_name || null,
            onFilter: (value: string, record) => record.category_id === value,
            filterSearch: true,
            render: (text) => {
                return `${text}`;
            },
        },

        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text) => {
                return `${text}`;
            },
        },

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text: any) => {
                return moment(text).format("LLL");
            },
        },
        {
            title: "Actions",
            key: "action",
            render: (record: any) => {
                const menuItems = [
                    {
                        key: "view",
                        label: (
                            <Link to={APP_PATH.expenses.view(record?.id)}>View</Link>
                        ),
                    },
                    {
                        key: "edit",
                        label: (
                            <Link to={APP_PATH.expenses.edit(record?.id)}>Edit</Link>
                        ),
                    },
                    {
                        key: "Delete",
                        label: (
                            <div
                                onClick={() =>
                                    setDeleteId(record?.id)
                                }
                                style={{ cursor: "pointer" }}
                                className="!text-red-500 !font-semibold"
                            >
                                Delete
                            </div>
                        ),
                    },
                ];

                return (
                    <Dropdown menu={{ items: menuItems }}>
                        <Button>
                            Actions <DownOutlined />
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <>
            <div>
                <div className="air__utils__heading" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>Add Expense</Title>

                    <Button
                        type="primary"
                        onClick={() => navigate(APP_PATH.expenses.add)}
                    >
                        Add Expense
                    </Button>
                </div>
                <Divider />
                <FilterComponent />
                <Table
                    className="custom-table"
                    rowKey={"_id"}
                    columns={columns}
                    dataSource={expenses || []}
                    scroll={{ x: "100%" }}
                    onChange={handleChange}
                    loading={loading}
                />
                <Modal
                    title="Delete Expense"
                    open={deleteId ? true : false}
                    onOk={hanleConfirmDelete}
                    onCancel={() => setDeleteId("")}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ danger: true }}
                >
                    <p>Are you sure you want to delete this expense?</p>
                    <p>This action cannot be undone.</p>
                </Modal>
            </div>
        </>
    );
};

export default ExpensesPage;
