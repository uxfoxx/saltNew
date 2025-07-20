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
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FaEye, FaBed, FaUsers, FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { Booking, OverviewData } from '../../../types';
import OverviewCard from '../../components/over-view/OverviewCard';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

interface RoomRecord {
    id: string;
    roomNumber: string;
    name: string;
    type: string;
    capacity: number;
    price: number;
    status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'ready';
    bannerImage: string;
    images: string[];
    roomOptions: string[];
    bookings: Booking[];
    currentGuest?: string;
    checkInTime?: string;
    checkOutTime?: string;
}

const AllRooms: React.FC = () => {
    const [showOverview, setShowOverview] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomRecord | null>(null);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [capacityFilter, setCapacityFilter] = useState<string>('all');
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const [priceRange, setPriceRange] = useState<string>('all');
    const [checkInModalOpen, setCheckInModalOpen] = useState(false);
    const [checkOutModalOpen, setCheckOutModalOpen] = useState(false);
    const [actionRoom, setActionRoom] = useState<RoomRecord | null>(null);
    const [form] = Form.useForm();

    // Sample room bookings
    const sampleRoomBookings: Booking[] = [
        {
            id: '1',
            guestName: 'John Smith',
            startDate: new Date('2025-01-20'),
            endDate: new Date('2025-01-22'),
            status: 'checked-in',
            phone: '+1 (555) 123-4567',
            email: 'john.smith@email.com'
        },
        {
            id: '2',
            guestName: 'Sarah Johnson',
            startDate: new Date('2025-01-25'),
            endDate: new Date('2025-01-27'),
            status: 'confirmed',
            phone: '+1 (555) 987-6543',
            email: 'sarah.johnson@email.com'
        }
    ];

    // All rooms data
    const [allRooms, setAllRooms] = useState<RoomRecord[]>([
        {
            id: 'dd-101',
            roomNumber: 'DD-101',
            name: 'Ocean Breeze Double',
            type: 'Deluxe Double',
            capacity: 2,
            price: 15000,
            status: 'available',
            bannerImage: '/assets/images/stay-with-us/double room 1.webp',
            images: ['/assets/images/stay-with-us/double room 1.webp', '/assets/images/stay-with-us/double room 2.webp'],
            roomOptions: ['Sea View', 'Air Conditioning', 'Private Balcony', 'Mini Bar'],
            bookings: []
        },
        {
            id: 'dd-102',
            roomNumber: 'DD-102',
            name: 'Sunset Double',
            type: 'Deluxe Double',
            capacity: 2,
            price: 16000,
            status: 'occupied',
            bannerImage: '/assets/images/stay-with-us/double room 2.webp',
            images: ['/assets/images/stay-with-us/double room 2.webp'],
            roomOptions: ['Sunset View', 'Air Conditioning', 'Kitchenette'],
            bookings: sampleRoomBookings,
            currentGuest: 'John Smith',
            checkInTime: '2025-01-20 14:30'
        },
        {
            id: 'dt-201',
            roomNumber: 'DT-201',
            name: 'Family Triple',
            type: 'Deluxe Triple',
            capacity: 3,
            price: 22500,
            status: 'cleaning',
            bannerImage: '/assets/images/stay-with-us/triple room 1.webp',
            images: ['/assets/images/stay-with-us/triple room 1.webp'],
            roomOptions: ['Sea View', 'Air Conditioning', 'Extra Bed', 'Mini Fridge'],
            bookings: []
        },
        {
            id: 'fs-301',
            roomNumber: 'FS-301',
            name: 'Premium Family Suite',
            type: 'Family Suite',
            capacity: 5,
            price: 35000,
            status: 'ready',
            bannerImage: '/assets/images/home/Explore Our Luxury Accommodation 1.webp',
            images: ['/assets/images/home/Explore Our Luxury Accommodation 1.webp'],
            roomOptions: ['Separate Living Room', 'Kitchen', 'Two Bedrooms', 'Sea View Balcony'],
            bookings: []
        },
        {
            id: 'ps-401',
            roomNumber: 'PS-401',
            name: 'Presidential Suite',
            type: 'Premium Suite',
            capacity: 4,
            price: 45000,
            status: 'maintenance',
            bannerImage: '/assets/images/home/Explore Our Luxury Accommodation 2.webp',
            images: ['/assets/images/home/Explore Our Luxury Accommodation 2.webp'],
            roomOptions: ['Panoramic Ocean View', 'Jacuzzi', 'Private Terrace', 'Butler Service'],
            bookings: []
        }
    ]);

    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaBedIcon = FaBed as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaUsersIcon = FaUsers as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaCalendarCheckIcon = FaCalendarCheck as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaCalendarTimesIcon = FaCalendarTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    // Filtered data
    const filteredRooms = useMemo(() => {
        return allRooms.filter((room) => {
            const matchesSearch = 
                room.roomNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                room.name.toLowerCase().includes(searchText.toLowerCase()) ||
                room.type.toLowerCase().includes(searchText.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
            const matchesType = typeFilter === 'all' || room.type === typeFilter;
            const matchesCapacity = capacityFilter === 'all' || room.capacity.toString() === capacityFilter;
            
            const matchesPrice = priceRange === 'all' || 
                (priceRange === 'low' && room.price < 20000) ||
                (priceRange === 'medium' && room.price >= 20000 && room.price < 35000) ||
                (priceRange === 'high' && room.price >= 35000);

            // Date range filter (check if room is available during selected dates)
            let matchesDateRange = true;
            if (dateRange) {
                const [startDate, endDate] = dateRange;
                // Simple availability check - in real app, this would be more complex
                matchesDateRange = room.status === 'available' || room.status === 'ready';
            }

            return matchesSearch && matchesStatus && matchesType && matchesCapacity && matchesPrice && matchesDateRange;
        });
    }, [allRooms, searchText, statusFilter, typeFilter, capacityFilter, priceRange, dateRange]);

    const handleViewRoomDetails = (room: RoomRecord) => {
        const roomData: OverviewData = {
            title: `Room ${room.roomNumber}`,
            subtitle: `${room.name} • ${room.capacity} Guests • LKR ${room.price.toLocaleString()}/night`,
            status: room.status,
            statusOptions: ['available', 'occupied', 'maintenance', 'cleaning', 'ready'],
            totalBookings: room.bookings.length,
            revenue: `LKR ${room.price.toLocaleString()}`,
            occupancyText: room.status === 'occupied' ? `Occupied by ${room.currentGuest}` : 'Room is available',
            appointmentText: room.bookings.length > 0 ? 'Has upcoming bookings' : 'No upcoming bookings',
            lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
            currentBookings: room.bookings.length,
            label: 'room',
            bookings: room.bookings,
            pricePerNight: room.price,
            type: 'room'
        };
        
        setSelectedRoom(room);
        setShowOverview(true);
    };

    const handleCheckIn = (room: RoomRecord) => {
        setActionRoom(room);
        setCheckInModalOpen(true);
    };

    const handleCheckOut = (room: RoomRecord) => {
        setActionRoom(room);
        setCheckOutModalOpen(true);
    };

    const processCheckIn = (values: any) => {
        if (!actionRoom) return;
        
        setAllRooms(prev => prev.map(room => 
            room.id === actionRoom.id 
                ? { 
                    ...room, 
                    status: 'occupied',
                    currentGuest: values.guestName,
                    checkInTime: new Date().toISOString()
                }
                : room
        ));
        
        setCheckInModalOpen(false);
        form.resetFields();
        message.success(`Room ${actionRoom.roomNumber} checked in successfully`);
    };

    const processCheckOut = () => {
        if (!actionRoom) return;
        
        setAllRooms(prev => prev.map(room => 
            room.id === actionRoom.id 
                ? { 
                    ...room, 
                    status: 'cleaning',
                    currentGuest: undefined,
                    checkOutTime: new Date().toISOString()
                }
                : room
        ));
        
        setCheckOutModalOpen(false);
        message.success(`Room ${actionRoom.roomNumber} checked out successfully`);
    };

    if (showOverview && selectedRoom) {
        const roomData: OverviewData = {
            title: `Room ${selectedRoom.roomNumber}`,
            subtitle: `${selectedRoom.name} • ${selectedRoom.capacity} Guests • LKR ${selectedRoom.price.toLocaleString()}/night`,
            status: selectedRoom.status,
            statusOptions: ['available', 'occupied', 'maintenance', 'cleaning', 'ready'],
            totalBookings: selectedRoom.bookings.length,
            revenue: `LKR ${selectedRoom.price.toLocaleString()}`,
            occupancyText: selectedRoom.status === 'occupied' ? `Occupied by ${selectedRoom.currentGuest}` : 'Room is available',
            appointmentText: selectedRoom.bookings.length > 0 ? 'Has upcoming bookings' : 'No upcoming bookings',
            lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
            currentBookings: selectedRoom.bookings.length,
            label: 'room',
            bookings: selectedRoom.bookings,
            pricePerNight: selectedRoom.price,
            type: 'room'
        };
        
        return <OverviewCard data={roomData} />;
    }

    const columns: ColumnsType<RoomRecord> = [
        {
            title: 'Room',
            dataIndex: 'roomNumber',
            render: (roomNumber: string, record: RoomRecord) => (
                <div className="flex items-center space-x-3">
                    <img 
                        src={record.bannerImage} 
                        alt={record.name}
                        className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                        <div className="font-semibold">{roomNumber}</div>
                        <div className="text-sm text-gray-500">{record.name}</div>
                    </div>
                </div>
            )
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (type: string) => <Tag color="blue">{type}</Tag>
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            render: (capacity: number) => (
                <div className="flex items-center space-x-1">
                    <FaUsersIcon className="text-gray-500" />
                    <span>{capacity}</span>
                </div>
            )
        },
        {
            title: 'Price/Night',
            dataIndex: 'price',
            render: (price: number) => (
                <span className="font-medium text-green-600">LKR {price.toLocaleString()}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string, record: RoomRecord) => (
                <div>
                    <Tag color={
                        status === 'available' ? 'green' :
                        status === 'occupied' ? 'blue' :
                        status === 'maintenance' ? 'red' :
                        status === 'cleaning' ? 'orange' : 'cyan'
                    }>
                        {status}
                    </Tag>
                    {record.currentGuest && (
                        <div className="text-xs text-gray-500 mt-1">{record.currentGuest}</div>
                    )}
                </div>
            )
        },
        {
            title: 'Bookings',
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
                        onClick={() => handleViewRoomDetails(record)}
                    >
                        Details
                    </Button>
                    {record.status === 'available' || record.status === 'ready' ? (
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
                        <h2 className="text-xl font-semibold mb-2">All Rooms</h2>
                        <p className="text-gray-600">Complete list of all rooms across all types</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaBedIcon className="text-2xl text-blue-500" />
                        <span className="text-2xl font-bold">{allRooms.length}</span>
                        <span className="text-gray-500">Total Rooms</span>
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
                                placeholder="Room number, name, type..."
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
                                <Option value="maintenance">Maintenance</Option>
                                <Option value="cleaning">Cleaning</Option>
                                <Option value="ready">Ready</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Room Type</label>
                            <Select
                                value={typeFilter}
                                onChange={setTypeFilter}
                                className="w-full"
                            >
                                <Option value="all">All Types</Option>
                                <Option value="Deluxe Double">Deluxe Double</Option>
                                <Option value="Deluxe Triple">Deluxe Triple</Option>
                                <Option value="Family Suite">Family Suite</Option>
                                <Option value="Premium Suite">Premium Suite</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Capacity</label>
                            <Select
                                value={capacityFilter}
                                onChange={setCapacityFilter}
                                className="w-full"
                            >
                                <Option value="all">All Capacities</Option>
                                <Option value="2">2 Guests</Option>
                                <Option value="3">3 Guests</Option>
                                <Option value="4">4 Guests</Option>
                                <Option value="5">5+ Guests</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price Range</label>
                            <Select
                                value={priceRange}
                                onChange={setPriceRange}
                                className="w-full"
                            >
                                <Option value="all">All Prices</Option>
                                <Option value="low">Under LKR 20,000</Option>
                                <Option value="medium">LKR 20,000 - 35,000</Option>
                                <Option value="high">Above LKR 35,000</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Availability Dates</label>
                            <RangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                className="w-full"
                                format="YYYY-MM-DD"
                            />
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Results Summary */}
            <Card>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                        Showing {filteredRooms.length} of {allRooms.length} rooms
                    </span>
                    <div className="flex space-x-4 text-sm">
                        <span className="text-green-600">
                            Available: {filteredRooms.filter(r => r.status === 'available').length}
                        </span>
                        <span className="text-blue-600">
                            Occupied: {filteredRooms.filter(r => r.status === 'occupied').length}
                        </span>
                        <span className="text-orange-600">
                            Cleaning: {filteredRooms.filter(r => r.status === 'cleaning').length}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Rooms Table */}
            <Card title="Rooms List">
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredRooms}
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
                        label="Check-in Notes"
                        name="notes"
                    >
                        <Input.TextArea rows={3} placeholder="Any special notes for check-in..." />
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
                <p>Are you sure you want to check out <strong>{actionRoom?.currentGuest}</strong> from room <strong>{actionRoom?.roomNumber}</strong>?</p>
                <p className="text-sm text-gray-500 mt-2">The room status will be changed to "Cleaning" and will need to be cleaned before the next guest.</p>
            </Modal>
        </div>
    );
};

export default AllRooms;