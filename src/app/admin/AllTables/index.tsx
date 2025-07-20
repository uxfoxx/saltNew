import React, { useState, useMemo } from 'react';
import {
    Button,
    Space,
    Table,
    Tag,
    DatePicker,
    Select,
    Input,
    Card,
    Row,
    Col,
    Modal,
    Form,
    message,
    TimePicker,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FaEye, FaUtensils, FaUsers, FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { Booking, OverviewData } from '../../../types';
import OverviewCard from '../../components/over-view/OverviewCard';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

interface TableRecord {
    id: string;
    tableNumber: string;
    name: string;
    type: string;
    seats: number;
    status: 'available' | 'occupied' | 'out-of-service' | 'preparing';
    location: string;
    bookings: Booking[];
    currentReservation?: string;
    reservationTime?: string;
}

const AllTables: React.FC = () => {
    const [showOverview, setShowOverview] = useState(false);
    const [selectedTable, setSelectedTable] = useState<TableRecord | null>(null);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [seatsFilter, setSeatsFilter] = useState<string>('all');
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const [timeRange, setTimeRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const [checkInModalOpen, setCheckInModalOpen] = useState(false);
    const [checkOutModalOpen, setCheckOutModalOpen] = useState(false);
    const [actionTable, setActionTable] = useState<TableRecord | null>(null);
    const [form] = Form.useForm();

    // Sample table bookings
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
            id: '6',
            guestName: 'Lisa Anderson',
            startDate: new Date('2025-01-16T18:30:00'),
            endDate: new Date('2025-01-16T20:30:00'),
            status: 'confirmed',
            phone: '+1 (555) 333-4444',
            email: 'lisa.anderson@email.com',
            partySize: 2
        }
    ];

    // All tables data
    const [allTables, setAllTables] = useState<TableRecord[]>([
        // Beachfront Tables
        {
            id: 'bf-01',
            tableNumber: 'BF-01',
            name: 'Sunset View Table',
            type: 'Beachfront',
            seats: 4,
            status: 'available',
            location: 'Beachfront - North',
            bookings: []
        },
        {
            id: 'bf-02',
            tableNumber: 'BF-02',
            name: 'Ocean Breeze Table',
            type: 'Beachfront',
            seats: 6,
            status: 'occupied',
            location: 'Beachfront - Center',
            bookings: sampleTableBookings,
            currentReservation: 'Robert Wilson',
            reservationTime: '19:00 - 21:00'
        },
        {
            id: 'bf-03',
            tableNumber: 'BF-03',
            name: 'Romantic Beachside',
            type: 'Beachfront',
            seats: 2,
            status: 'preparing',
            location: 'Beachfront - South',
            bookings: []
        },
        // Indoor Tables
        {
            id: 'in-01',
            tableNumber: 'IN-01',
            name: 'Main Hall Table',
            type: 'Indoor',
            seats: 4,
            status: 'available',
            location: 'Indoor - Main Hall',
            bookings: []
        },
        {
            id: 'in-02',
            tableNumber: 'IN-02',
            name: 'Private Corner',
            type: 'Indoor',
            seats: 6,
            status: 'occupied',
            location: 'Indoor - Private Corner',
            bookings: sampleTableBookings,
            currentReservation: 'Lisa Anderson',
            reservationTime: '18:30 - 20:30'
        },
        // Lounge Tables
        {
            id: 'lg-01',
            tableNumber: 'LG-01',
            name: 'Sea View Lounge',
            type: 'Lounge',
            seats: 4,
            status: 'available',
            location: 'Lounge - Sea View',
            bookings: []
        },
        {
            id: 'lg-02',
            tableNumber: 'LG-02',
            name: 'Premium Lounge',
            type: 'Lounge',
            seats: 6,
            status: 'out-of-service',
            location: 'Lounge - Premium',
            bookings: []
        }
    ]);

    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaUtensilsIcon = FaUtensils as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaUsersIcon = FaUsers as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaCalendarCheckIcon = FaCalendarCheck as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaCalendarTimesIcon = FaCalendarTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    // Filtered data
    const filteredTables = useMemo(() => {
        return allTables.filter((table) => {
            const matchesSearch = 
                table.tableNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                table.name.toLowerCase().includes(searchText.toLowerCase()) ||
                table.type.toLowerCase().includes(searchText.toLowerCase()) ||
                table.location.toLowerCase().includes(searchText.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || table.status === statusFilter;
            const matchesType = typeFilter === 'all' || table.type === typeFilter;
            const matchesSeats = seatsFilter === 'all' || 
                (seatsFilter === '2' && table.seats <= 2) ||
                (seatsFilter === '4' && table.seats > 2 && table.seats <= 4) ||
                (seatsFilter === '6+' && table.seats > 4);

            // Date and time range filter
            let matchesDateTime = true;
            if (dateRange && timeRange) {
                // Simple availability check - in real app, this would check actual reservations
                matchesDateTime = table.status === 'available';
            }

            return matchesSearch && matchesStatus && matchesType && matchesSeats && matchesDateTime;
        });
    }, [allTables, searchText, statusFilter, typeFilter, seatsFilter, dateRange, timeRange]);

    const handleViewTableDetails = (table: TableRecord) => {
        const tableData: OverviewData = {
            title: `Table ${table.tableNumber}`,
            subtitle: `${table.name} • ${table.seats} Seats • ${table.location}`,
            status: table.status,
            statusOptions: ['available', 'occupied', 'out-of-service', 'preparing'],
            totalBookings: table.bookings.length,
            revenue: '$150',
            occupancyText: table.status === 'occupied' ? `Reserved by ${table.currentReservation}` : 'Table is available',
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

    const handleCheckIn = (table: TableRecord) => {
        setActionTable(table);
        setCheckInModalOpen(true);
    };

    const handleCheckOut = (table: TableRecord) => {
        setActionTable(table);
        setCheckOutModalOpen(true);
    };

    const processCheckIn = (values: any) => {
        if (!actionTable) return;
        
        setAllTables(prev => prev.map(table => 
            table.id === actionTable.id 
                ? { 
                    ...table, 
                    status: 'occupied',
                    currentReservation: values.guestName,
                    reservationTime: `${values.startTime.format('HH:mm')} - ${values.endTime.format('HH:mm')}`
                }
                : table
        ));
        
        setCheckInModalOpen(false);
        form.resetFields();
        message.success(`Table ${actionTable.tableNumber} checked in successfully`);
    };

    const processCheckOut = () => {
        if (!actionTable) return;
        
        setAllTables(prev => prev.map(table => 
            table.id === actionTable.id 
                ? { 
                    ...table, 
                    status: 'preparing',
                    currentReservation: undefined,
                    reservationTime: undefined
                }
                : table
        ));
        
        setCheckOutModalOpen(false);
        message.success(`Table ${actionTable.tableNumber} checked out successfully`);
    };

    if (showOverview && selectedTable) {
        const tableData: OverviewData = {
            title: `Table ${selectedTable.tableNumber}`,
            subtitle: `${selectedTable.name} • ${selectedTable.seats} Seats • ${selectedTable.location}`,
            status: selectedTable.status,
            statusOptions: ['available', 'occupied', 'out-of-service', 'preparing'],
            totalBookings: selectedTable.bookings.length,
            revenue: '$150',
            occupancyText: selectedTable.status === 'occupied' ? `Reserved by ${selectedTable.currentReservation}` : 'Table is available',
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
            title: 'Table',
            dataIndex: 'tableNumber',
            render: (tableNumber: string, record: TableRecord) => (
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                        <FaUtensilsIcon className="text-blue-600" />
                    </div>
                    <div>
                        <div className="font-semibold">{tableNumber}</div>
                        <div className="text-sm text-gray-500">{record.name}</div>
                    </div>
                </div>
            )
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (type: string) => (
                <Tag color={
                    type === 'Beachfront' ? 'blue' :
                    type === 'Indoor' ? 'green' : 'purple'
                }>
                    {type}
                </Tag>
            )
        },
        {
            title: 'Location',
            dataIndex: 'location',
            render: (location: string) => (
                <span className="text-sm">{location}</span>
            )
        },
        {
            title: 'Seats',
            dataIndex: 'seats',
            render: (seats: number) => (
                <div className="flex items-center space-x-1">
                    <FaUsersIcon className="text-gray-500" />
                    <span>{seats}</span>
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string, record: TableRecord) => (
                <div>
                    <Tag color={
                        status === 'available' ? 'green' :
                        status === 'occupied' ? 'blue' :
                        status === 'preparing' ? 'orange' : 'red'
                    }>
                        {status}
                    </Tag>
                    {record.currentReservation && (
                        <div className="text-xs text-gray-500 mt-1">
                            {record.currentReservation}
                            <br />
                            {record.reservationTime}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Reservations',
            dataIndex: 'bookings',
            render: (bookings: Booking[]) => (
                <span className="font-medium">{bookings.length}</span>
            )
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Button 
                        size="small" 
                        icon={<FaEyeIcon />}
                        onClick={() => handleViewTableDetails(record)}
                    >
                        Details
                    </Button>
                    {record.status === 'available' ? (
                        <Button 
                            size="small" 
                            type="primary"
                            icon={<FaCalendarCheckIcon />}
                            onClick={() => handleCheckIn(record)}
                        >
                            Check In
                        </Button>
                    ) : record.status === 'occupied' ? (
                        <Button 
                            size="small" 
                            danger
                            icon={<FaCalendarTimesIcon />}
                            onClick={() => handleCheckOut(record)}
                        >
                            Check Out
                        </Button>
                    ) : null}
                </Space>
            )
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">All Tables</h2>
                        <p className="text-gray-600">Complete list of all tables across all dining areas</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaUtensilsIcon className="text-2xl text-blue-500" />
                        <span className="text-2xl font-bold">{allTables.length}</span>
                        <span className="text-gray-500">Total Tables</span>
                    </div>
                </div>
            </Card>

            {/* Filters */}
            <Card title="Filters">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search</label>
                            <Search
                                placeholder="Table number, name, location..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                allowClear
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                className="w-full"
                            >
                                <Option value="all">All Status</Option>
                                <Option value="available">Available</Option>
                                <Option value="occupied">Occupied</Option>
                                <Option value="preparing">Preparing</Option>
                                <Option value="out-of-service">Out of Service</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Table Type</label>
                            <Select
                                value={typeFilter}
                                onChange={setTypeFilter}
                                className="w-full"
                            >
                                <Option value="all">All Types</Option>
                                <Option value="Beachfront">Beachfront</Option>
                                <Option value="Indoor">Indoor</Option>
                                <Option value="Lounge">Lounge</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Seats</label>
                            <Select
                                value={seatsFilter}
                                onChange={setSeatsFilter}
                                className="w-full"
                            >
                                <Option value="all">All Sizes</Option>
                                <Option value="2">1-2 Seats</Option>
                                <Option value="4">3-4 Seats</Option>
                                <Option value="6+">5+ Seats</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Availability Date</label>
                            <RangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                className="w-full"
                                format="YYYY-MM-DD"
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Time Range</label>
                            <TimePicker.RangePicker
                                value={timeRange}
                                onChange={setTimeRange}
                                className="w-full"
                                format="HH:mm"
                            />
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Results Summary */}
            <Card>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                        Showing {filteredTables.length} of {allTables.length} tables
                    </span>
                    <div className="flex space-x-4 text-sm">
                        <span className="text-green-600">
                            Available: {filteredTables.filter(t => t.status === 'available').length}
                        </span>
                        <span className="text-blue-600">
                            Occupied: {filteredTables.filter(t => t.status === 'occupied').length}
                        </span>
                        <span className="text-orange-600">
                            Preparing: {filteredTables.filter(t => t.status === 'preparing').length}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Tables Table */}
            <Card title="Tables List">
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredTables}
                        rowKey="id"
                        pagination={{ pageSize: 10, showSizeChanger: true }}
                    />
                </div>
            </Card>

            {/* Check In Modal */}
            <Modal
                title="Check In Guest"
                open={checkInModalOpen}
                onCancel={() => {
                    setCheckInModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
            >
                <Form form={form} onFinish={processCheckIn} layout="vertical">
                    <Form.Item
                        label="Guest Name"
                        name="guestName"
                        rules={[{ required: true, message: 'Please enter guest name' }]}
                    >
                        <Input placeholder="Enter guest name" />
                    </Form.Item>
                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[{ required: true, message: 'Please select start time' }]}
                    >
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[{ required: true, message: 'Please select end time' }]}
                    >
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                    <Form.Item
                        label="Party Size"
                        name="partySize"
                        rules={[{ required: true, message: 'Please enter party size' }]}
                    >
                        <Input type="number" placeholder="Number of guests" />
                    </Form.Item>
                    <Form.Item
                        label="Special Notes"
                        name="notes"
                    >
                        <Input.TextArea rows={3} placeholder="Any special requests or notes..." />
                    </Form.Item>
                    <Form.Item>
                        <Space className="w-full justify-end">
                            <Button onClick={() => setCheckInModalOpen(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Check In</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Check Out Modal */}
            <Modal
                title="Check Out Guest"
                open={checkOutModalOpen}
                onCancel={() => setCheckOutModalOpen(false)}
                onOk={processCheckOut}
                centered
            >
                <p>Are you sure you want to check out <strong>{actionTable?.currentReservation}</strong> from table <strong>{actionTable?.tableNumber}</strong>?</p>
                <p className="text-sm text-gray-500 mt-2">The table status will be changed to "Preparing" and will need to be cleaned and set up for the next guests.</p>
            </Modal>
        </div>
    );
};

export default AllTables;