/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
    Table,
    Button,
    Dropdown,
    Modal,
    Typography,
    Divider
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, InputRef } from "antd"; // Ensure this import is correct
import { ColumnType } from "antd/es/table"; // Adjust the import as necessary
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import APP_PATH from "../../routes/app-path";
import toast from "react-hot-toast";
import { ApiStatus } from "../../type/app.type";
import { deleteUser, fetchUsers } from "../../store/users/user.slice";

const { Title } = Typography

const UserPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const searchInput = useRef<InputRef | null>(null);

    const [deleteId, setDeleteId] = useState("")
    const navigate = useNavigate()
    const [filters, setFilters] = useState<any>({
    });


    const { users,loading } = useAppSelector(
        (state) => state.users
    );



    useEffect(() => {
        dispatch(fetchUsers())
    }, [])



    const handleSearch = () => {
      const params:any={}
      if(filters?.email && filters?.email.length > 0){
        params["email"]=filters?.email[0]
      }
      if(filters?.name && filters?.name.length > 0){
        params["name"]=filters?.name[0]
      }
        dispatch(fetchUsers(params));
    };
    const handleReset = async (dataIndex: string) => {
        const applyfilters: any = filters;
        delete applyfilters[dataIndex];
        setFilters(applyfilters);

        dispatch(fetchUsers());
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

    const hanleConfirmDelete = async () => {
        if (deleteId) {
            const res = await deleteUser(deleteId)
            if (res.status == ApiStatus.success) {
                setDeleteId("")
                toast.success(res.message)
                dispatch(fetchUsers())
            } else {
                toast.error(res.message)
            }
        } else {
            toast.error("Select Expense for Delete")
        }
    }

  


    const columns: ColumnType<any>[] = [
        {
            title: "User Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "User Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },


       
        {
            title: "Actions",
            key: "action",
            render: (record: any) => {
                const menuItems = [
                    {
                        key: "view",
                        label: (
                            <Link to={APP_PATH.users.view(record?.id)}>View</Link>
                        ),
                    },
                    {
                        key: "edit",
                        label: (
                            <Link to={APP_PATH.users.edit(record?.id)}>Edit</Link>
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
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>Users</Title>

                    <Button
                        type="primary"
                        onClick={() => navigate(APP_PATH.users.add)}
                    >
                        Add User
                    </Button>
                </div>
                <Divider />
                <Table
                    className="custom-table"
                    rowKey={"_id"}
                    columns={columns}
                    dataSource={users || []}
                    scroll={{ x: "100%" }}
                    pagination={{
                        defaultCurrent: 1,
                        total: users.length,
                    }}
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
                    <p>Are you sure you want to delete this User?</p>
                    <p>This action cannot be undone.</p>
                </Modal>
            </div>
        </>
    );
};

export default UserPage;
