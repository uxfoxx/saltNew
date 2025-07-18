import React, { useState } from 'react';
import {
    Button,
    Modal,
    Space,
    Table,
    Tag,
    Descriptions,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const { Option } = Select;

interface TableRecord {
    tableNumber: string;
    seats: number;
    status: 'available' | 'out-of-service';
}

const TableManagement: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TableRecord[]>([
        { tableNumber: 'T1', seats: 4, status: 'available' },
        { tableNumber: 'T2', seats: 6, status: 'available' },
        { tableNumber: 'T3', seats: 2, status: 'out-of-service' },
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<TableRecord | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const toggleTableStatus = (tableNumber: string, outOfService: boolean) => {
        setData((prev) =>
            prev.map((table) =>
                table.tableNumber === tableNumber
                    ? {
                        ...table,
                        status: outOfService ? 'out-of-service' : 'available',
                    }
                    : table
            )
        );
    };

    const handleAddTable = (values: any) => {
        const newTable: TableRecord = {
            tableNumber: values.tableNumber,
            seats: values.seats,
            status: values.status,
        };
        setData((prev) => [...prev, newTable]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const columns: ColumnsType<TableRecord> = [
        { title: 'Table Number', dataIndex: 'tableNumber' },
        { title: 'Seats', dataIndex: 'seats' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: TableRecord['status']) => {
                return (
                    <Tag color={status === 'available' ? 'green' : 'red'}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => {
                        navigate(`/admin/table-management/${record.tableNumber}`);
                    }}>
                        <FaEyeIcon className="h-4 w-4" />
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedTable(record);
                        setViewModalOpen(true);
                    }}>
                        Edit
                    </Button>
                    {record.status === 'available' ? (
                        <Button
                            size="small"
                            danger
                            onClick={() => toggleTableStatus(record.tableNumber, true)}
                        >
                            Set Out of Service
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => toggleTableStatus(record.tableNumber, false)}
                        >
                            Set Available
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Table Management"
                onNewClick={() => setAddModalOpen(true)}
                newButtonLabel="Add New Table"
                showFilter={false}
                showSearch={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="tableNumber"
                    pagination={false}
                />
            </div>

            {/* View Table Modal */}
            <Modal
                open={viewModalOpen}
                title="Table Details"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedTable(null);
                }}
                centered
                destroyOnClose
            >
                {selectedTable && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Table Number">{selectedTable.tableNumber}</Descriptions.Item>
                        <Descriptions.Item label="Seats">{selectedTable.seats}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={selectedTable.status === 'available' ? 'green' : 'red'}>
                                {selectedTable.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Add Table Modal */}
            <Modal
                open={addModalOpen}
                title="Add New Table"
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleAddTable}>
                    <Form.Item
                        label="Table Number"
                        name="tableNumber"
                        rules={[{ required: true, message: 'Please enter table number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Seats"
                        name="seats"
                        rules={[{ required: true, message: 'Please enter number of seats' }]}
                    >
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select placeholder="Select status">
                            <Option value="available">Available</Option>
                            <Option value="out-of-service">Out of Service</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Add Table
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableManagement;
