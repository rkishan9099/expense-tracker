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
import toast from "react-hot-toast";
import { ApiStatus } from "../../type/app.type";
import { deleteCategory, fetchCategories, setSelctedCategory } from "../../store/category/category.slice";
import CategoryModal from "../../components/category/CategoryModal";

const { Title } = Typography

const CategoryPage: React.FC = () => {

    const [editId, setEditId] = useState("")
    const [open, setOpen] = useState(false)

    const dispatch = useAppDispatch();
    const searchInput = useRef<InputRef | null>(null);

    const [deleteId, setDeleteId] = useState("")
    const [filters, setFilters] = useState<any>({
    });


    const { category, loading } = useAppSelector(
        (state) => state.category
    );



    useEffect(() => {
        dispatch(fetchCategories())
    }, [])



    const handleSearch = () => {
        const params: any = {}
        if (filters?.name && filters?.name.length > 0) {
            params["name"] = filters?.name[0]
        }
        dispatch(fetchCategories(params));
    };
    const handleReset = async (dataIndex: string) => {
        const applyfilters: any = filters;
        delete applyfilters[dataIndex];
        setFilters(applyfilters);

        dispatch(fetchCategories());
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
            const res = await deleteCategory(deleteId)
            if (res.status == ApiStatus.success) {
                setDeleteId("")
                toast.success(res.message)
                dispatch(fetchCategories())
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
            title: "Actions",
            key: "action",
            render: (record: any) => {
                const menuItems = [

                    {
                        key: "edit",
                        label: (
                            <div
                                onClick={() => {
                                    setEditId(record?.id)
                                    setOpen(true)
                                    dispatch(setSelctedCategory(record))
                                }
                                }
                                style={{ cursor: "pointer" }}
                                className="!text-red-500 !font-semibold"
                            >
                                Edit
                            </div>
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
                    <Title level={2} style={{ margin: '0 0 0 16px' }}>Category</Title>

                    <Button
                        type="primary"
                        onClick={() => {
                            setOpen(true)
                            setEditId("")
                        }}
                    >
                        Add Category
                    </Button>
                </div>
                <Divider />
                <Table
                    className="custom-table"
                    rowKey={"_id"}
                    columns={columns}
                    dataSource={category || []}
                    scroll={{ x: "100%" }}
                    pagination={{
                        defaultCurrent: 1,
                        total: category.length,
                    }}
                    loading={loading}
                />
                <Modal
                    title="Delete Category"
                    open={deleteId ? true : false}
                    onOk={hanleConfirmDelete}
                    onCancel={() => setDeleteId("")}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ danger: true }}
                >
                    <p>Are you sure you want to delete this Category?</p>
                    <p>This action cannot be undone.</p>
                </Modal>

                <CategoryModal id={editId} onClose={() => setOpen(false)} visible={open} />
            </div>
        </>
    );
};

export default CategoryPage;
