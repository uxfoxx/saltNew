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
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaArrowLeft } from 'react-icons/fa';
import { Booking, OverviewData } from '../../../types';
import OverviewCard from '../../components/over-view/OverviewCard';

const { Option } = Select;

interface TableRecord {
    tableNumber: string;
    seats: number;
    status: 'available' | 'occupied' | 'out-of-service' | 'preparing';
    location: string;
    bookings: Booking[];
}

const TableOverview: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [showOverview, setShowOverview] = useState(false);
    const [selectedTable, setSelectedTable] = useState<TableRecord | null>(null);
    
    // Sample bookings for tables
    const sampleTableBookings: Booking[] = [
        {
            id: '5',
            guestName: 'Robert Wilson',
            startDate: new Date('2025-01-15T19:00:00'),
            endDate: new Date('2025-01-15T21:00:00'),
            status: 'confirmed',
            phone: '+1 (555) 111-2222',
            email: 'robert.wilson@email.com',
            partySize: 4
        },
        {
            id: '9',
            guestName: 'Pramud Ndaula',
            startDate: new Date('2025-01-15T16:00:00'),
            endDate: new Date('2025-01-15T19:00:00'),
            status: 'confirmed',
            phone: '+1 (555) 111-2222',
            email: 'pramud.ndaula@email.com',
            partySize: 4
        },
        {
            id: '6',
            guestName: 'Lisa Anderson',
            startDate: new Date('2025-01-16T18:30:00'),
            endDate: new Date('2025-01-16T20:30:00'),
            status: 'confirmed',
            phone: '+1 (555) 333-4444',
            email: 'lisa.anderson@email.com',
            partySize: 2
        },
    ];

    const getTableTypeData = (tableTypeId: string) => {
        const tableTypes: Record<string, { name: string; tables: TableRecord[] }> = {
            'beachfront': {
                name: 'Beachfront Dining',
                tables: [
                    { tableNumber: 'BF-01', seats: 4, status: 'available', location: 'Beachfront - North', bookings: sampleTableBookings },
                    { tableNumber: 'BF-02', seats: 6, status: 'occupied', location: 'Beachfront - Center', bookings: sampleTableBookings },
                    { tableNumber: 'BF-03', seats: 2, status: 'preparing', location: 'Beachfront - South', bookings: [] },
                    { tableNumber: 'BF-04', seats: 8, status: 'available', location: 'Beachfront - VIP', bookings: [] },
                    { tableNumber: 'BF-05', seats: 4, status: 'out-of-service', location: 'Beachfront - North', bookings: [] },
                    { tableNumber: 'BF-06', seats: 6, status: 'available', location: 'Beachfront - Center', bookings: [] },
                    { tableNumber: 'BF-07', seats: 2, status: 'occupied', location: 'Beachfront - South', bookings: sampleTableBookings },
                    { tableNumber: 'BF-08', seats: 4, status: 'preparing', location: 'Beachfront - East', bookings: [] },
                ]
            },
            'indoor': {
                name: 'Indoor Dining',
                tables: [
                    { tableNumber: 'IN-01', seats: 4, status: 'available', location: 'Indoor - Main Hall', bookings: [] },
                    { tableNumber: 'IN-02', seats: 6, status: 'occupied', location: 'Indoor - Private Corner', bookings: sampleTableBookings },
                    { tableNumber: 'IN-03', seats: 2, status: 'preparing', location: 'Indoor - Window Side', bookings: [] },
                    { tableNumber: 'IN-04', seats: 8, status: 'available', location: 'Indoor - Family Section', bookings: [] },
                    { tableNumber: 'IN-05', seats: 4, status: 'available', location: 'Indoor - Main Hall', bookings: [] },
                    { tableNumber: 'IN-06', seats: 6, status: 'out-of-service', location: 'Indoor - Back Area', bookings: [] },
                ]
            },
            'lounge': {
                name: 'Lounge',
                tables: [
                    { tableNumber: 'LG-01', seats: 4, status: 'available', location: 'Lounge - Sea View', bookings: [] },
                    { tableNumber: 'LG-02', seats: 6, status: 'occupied', location: 'Lounge - Premium', bookings: sampleTableBookings },
                    { tableNumber: 'LG-03', seats: 2, status: 'preparing', location: 'Lounge - Intimate', bookings: [] },
                    { tableNumber: 'LG-04', seats: 8, status: 'available', location: 'Lounge - Group Area', bookings: [] },
                ]
            }
        };
        return tableTypes[tableTypeId || ''] || { name: 'Unknown', tables: [] };
    };

    const [data, setData] = useState<TableRecord[]>(getTableTypeData(id).tables);
    const tableTypeName = getTableTypeData(id).name;

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedTableRecord, setSelectedTableRecord] = useState<TableRecord | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaArrowLeftIcon = FaArrowLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const toggleTableStatus = (tableNumber: string, newStatus: TableRecord['status']) => {
        setData(prev =>
            prev.map(table =>
                table.tableNumber === tableNumber
                    ? { ...table, status: newStatus }
                    : table
            )
        );
    };

    const handleAddTable = (values: any) => {
        const newTable: TableRecord = {
            tableNumber: values.tableNumber,
            seats: values.seats,
            status: values.status,
            location: values.location,
            bookings: [],
        };
        setData(prev => [...prev, newTable]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const handleViewTableDetails = (table: TableRecord) => {
        const tableData: OverviewData = {
            title: `Table ${table.tableNumber}`,
            subtitle: `${table.seats} Seats • ${table.location}`,
            status: table.status,
            statusOptions: ['available', 'occupied', 'out-of-service', 'preparing'],
            totalBookings: table.bookings.length,
            revenue: '$150',
            occupancyText: table.status === 'occupied' ? 'Table is currently occupied' : 'Table is available',
            appointmentText: table.bookings.length > 0 ? 'Has upcoming reservations' : 'No upcoming reservations',
            lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
            currentBookings: table.bookings.length,
            label: 'table',
            bookings: table.bookings,
            type: 'table'
        };
        
        setSelectedTable(table);
        setShowOverview(true);
    };

    if (showOverview && selectedTable) {
        const tableData: OverviewData = {
            title: `Table ${selectedTable.tableNumber}`,
            subtitle: `${selectedTable.seats} Seats • ${selectedTable.location}`,
            status: selectedTable.status,
            statusOptions: ['available', 'occupied', 'out-of-service', 'preparing'],
            totalBookings: selectedTable.bookings.length,
            revenue: '$150',
            occupancyText: selectedTable.status === 'occupied' ? 'Table is currently occupied' : 'Table is available',
            appointmentText: selectedTable.bookings.length > 0 ? 'Has upcoming reservations' : 'No upcoming reservations',
            lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
            currentBookings: selectedTable.bookings.length,
            label: 'table',
            bookings: selectedTable.bookings,
            type: 'table'
        };
        
        return <OverviewCard data={tableData} />;
    }

    const columns: ColumnsType<TableRecord> = [
        { 
            title: 'Table Number', 
            dataIndex: 'tableNumber',
            render: (tableNumber: string) => <span className="font-semibold">{tableNumber}</span>
        },
        { title: 'Seats', dataIndex: 'seats' },
        { title: 'Location', dataIndex: 'location' },
        {
            title: 'Current Bookings',
            dataIndex: 'bookings',
            render: (bookings: Booking[]) => (
                <span className="font-medium">{bookings.length}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: TableRecord['status']) => {
                const colorMap = {
                    available: 'green',
                    occupied: 'blue',
                    'out-of-service': 'red',
                    preparing: 'orange',
                };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => handleViewTableDetails(record)}>
                        <FaEyeIcon className="h-4 w-4" />
                        Details
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedTableRecord(record);
                        setViewModalOpen(true);
                    }}>
                        Edit
                    </Button>
                    <Select
                        size="small"
                        value={record.status}
                        onChange={(value) => toggleTableStatus(record.tableNumber, value)}
                        style={{ width: 120 }}
                    >
                        <Option value="available">Available</Option>
                        <Option value="occupied">Occupied</Option>
                        <Option value="preparing">Preparing</Option>
                        <Option value="out-of-service">Out of Service</Option>
                    </Select>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <Button 
                    icon={<FaArrowLeftIcon />} 
                    onClick={() => navigate('/admin/table-management')}
                >
                    Back to Table Types
                </Button>
                <h1 className="text-xl font-semibold">{tableTypeName} - Tables</h1>
            </div>

            <PageHeaderWithActions
                title={`${tableTypeName} Tables`}
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
                    setSelectedTableRecord(null);
                }}
                centered
                destroyOnClose
            >
                {selectedTableRecord && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Table Number">{selectedTableRecord.tableNumber}</Descriptions.Item>
                        <Descriptions.Item label="Seats">{selectedTableRecord.seats}</Descriptions.Item>
                        <Descriptions.Item label="Location">{selectedTableRecord.location}</Descriptions.Item>
                        <Descriptions.Item label="Current Bookings">{selectedTableRecord.bookings.length}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={
                                selectedTableRecord.status === 'available' ? 'green' :
                                selectedTableRecord.status === 'occupied' ? 'blue' :
                                selectedTableRecord.status === 'preparing' ? 'orange' : 'red'
                            }>
                                {selectedTableRecord.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Add Table Modal */}
            <Modal
                open={addModalOpen}
                title={`Add New Table to ${tableTypeName}`}
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
                        <Input placeholder="e.g., BF-09, IN-07, LG-05" />
                    </Form.Item>
                    <Form.Item
                        label="Number of Seats"
                        name="seats"
                        rules={[{ required: true, message: 'Please enter number of seats' }]}
                    >
                        <InputNumber min={1} max={20} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please enter location' }]}
                    >
                        <Input placeholder="e.g., Beachfront - North, Indoor - Main Hall" />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select placeholder="Select status">
                            <Option value="available">Available</Option>
                            <Option value="occupied">Occupied</Option>
                            <Option value="preparing">Preparing</Option>
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

export default TableOverview;