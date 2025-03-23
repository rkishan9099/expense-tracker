/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Select, DatePicker, Button, Row, Col, Space, Card } from "antd";
import { FilterOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchExpenses } from "../../store/expenses/expenses.slice";

const { RangePicker } = DatePicker;

const FilterComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const { category } = useAppSelector((state) => state.category);

    const [filters, setFilters] = useState<{
        search?: string;
        category?: string[];
        user?: string[];
        dateRange?: [string, string];
    }>({});

    const handleFilterChange = () => {
        console.log(filters);
        dispatch(fetchExpenses(filters as any));
    };

    const handleReset = () => {
        dispatch(fetchExpenses());
        setFilters({});
    };

    return (
        <Card 
            style={{ margin: "20px 0", padding: "20px", borderRadius: "8px" }} 
            bordered
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Row gutter={[12, 12]} wrap align="middle">
                    {/* Search Input */}
                    <Col xs={24} sm={12} md={6} lg={5}>
                        <Input
                            placeholder="Search..."
                            prefix={<SearchOutlined />}
                            allowClear
                            value={filters.search}
                            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                        />
                    </Col>

                    {/* Category Filter */}
                    <Col xs={24} sm={12} md={6} lg={5}>
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select Categories"
                            allowClear
                            style={{ width: "100%" }}
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            value={filters.category}
                            onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}  
                            options={category.map((cat: any) => ({ label: cat.name, value: cat.id }))}
                        />
                    </Col>

                    {/* User Filter */}
                    <Col xs={24} sm={12} md={6} lg={5}>
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select Users"
                            allowClear
                            style={{ width: "100%" }}
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            value={filters.user}
                            onChange={(value) => setFilters((prev) => ({ ...prev, user: value }))}  
                            options={users.map((user: any) => ({ label: user.name, value: user.id }))}
                        />
                    </Col>

                    {/* Date Picker */}
                    <Col xs={24} sm={12} md={6} lg={5}>
                        <RangePicker
                            style={{ width: "100%" }}
                            value={filters.dateRange ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])] : undefined}
                            onChange={(dates: any) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    dateRange: dates ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")] : undefined,
                                }))
                            }
                        />
                    </Col>

                    {/* Apply & Reset Buttons */}
                    <Col xs={12} sm={6} md={3} lg={2}>
                        <Button type="primary" icon={<FilterOutlined />} onClick={handleFilterChange} style={{ width: "100%" }}>
                            Apply
                        </Button>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={2}>
                        <Button icon={<ReloadOutlined />} onClick={handleReset} style={{ width: "100%" }}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
};

export default FilterComponent;
