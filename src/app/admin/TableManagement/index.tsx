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

interface TableType {
    id: string;
    name: string;
    description: string;
    totalTables: number;
    availableTables: number;
    location: string;
}

const TableManagement: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TableType[]>([
        { 
            id: 'beachfront', 
            name: 'Beachfront Dining', 
            description: 'Tables with direct beach view and ocean breeze',
            totalTables: 8,
            availableTables: 6,
            location: 'Beachfront Area'
        },
        { 
            id: 'indoor', 
            name: 'Indoor Dining', 
            description: 'Climate-controlled indoor seating area',
            totalTables: 12,
            availableTables: 10,
            location: 'Ground Floor'
        },
        { 
            id: 'lounge', 
            name: 'Lounge', 
            description: 'Air-conditioned upper floor with sea view',
            totalTables: 6,
            availableTables: 4,
            location: 'Upper Floor'
        },
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedTableType, setSelectedTableType] = useState<TableType | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const handleAddTableType = (values: any) => {
        const newTableType: TableType = {
            id: values.name.toLowerCase().replace(/\s+/g, '-'),
            name: values.name,
            description: values.description,
            totalTables: 0,
            availableTables: 0,
            location: values.location,
        };
        setData((prev) => [...prev, newTableType]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const columns: ColumnsType<TableType> = [
        { 
            title: 'Table Type', 
            dataIndex: 'name',
            render: (name: string) => <span className="font-semibold">{name}</span>
        },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Location', dataIndex: 'location' },
        { 
            title: 'Total Tables', 
            dataIndex: 'totalTables',
            render: (total: number) => <span className="font-medium">{total}</span>
        },
        { 
            title: 'Available', 
            dataIndex: 'availableTables',
            render: (available: number, record: TableType) => (
                <Tag color={available > 0 ? 'green' : 'red'}>
                    {available}/{record.totalTables}
                </Tag>
            )
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        size="small" 
                        type="primary"
                        onClick={() => {
                            navigate(`/admin/table-management/${record.id}`);
                        }}
                    >
                        <FaEyeIcon className="h-4 w-4" />
                        View Tables
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedTableType(record);
                        setViewModalOpen(true);
                    }}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Table Management - Table Types"
                onNewClick={() => setAddModalOpen(true)}
                newButtonLabel="Add New Table Type"
                showFilter={false}
                showSearch={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={false}
                />
            </div>

            {/* View/Edit Table Type Modal */}
            <Modal
                open={viewModalOpen}
                title="Table Type Details"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedTableType(null);
                }}
                centered
                destroyOnClose
            >
                {selectedTableType && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">{selectedTableType.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedTableType.description}</Descriptions.Item>
                        <Descriptions.Item label="Location">{selectedTableType.location}</Descriptions.Item>
                        <Descriptions.Item label="Total Tables">{selectedTableType.totalTables}</Descriptions.Item>
                        <Descriptions.Item label="Available Tables">
                            <Tag color={selectedTableType.availableTables > 0 ? 'green' : 'red'}>
                                {selectedTableType.availableTables}/{selectedTableType.totalTables}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Add Table Type Modal */}
            <Modal
                open={addModalOpen}
                title="Add New Table Type"
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleAddTableType}>
                    <Form.Item
                        label="Table Type Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter table type name' }]}
                    >
                        <Input placeholder="e.g., VIP Dining, Garden Tables" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Describe the table type and its features..." />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please enter location' }]}
                    >
                        <Input placeholder="e.g., Rooftop, Garden Area, Main Hall" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Add Table Type
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableManagement;