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
    Upload,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaArrowLeft } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';
import { Booking, OverviewData } from '../../../types';
import OverviewCard from '../../components/over-view/OverviewCard';

const { Option } = Select;
const { TextArea } = Input;

interface RoomRecord {
    roomNumber: string;
    name: string;
    capacity: number;
    price: number;
    status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'ready';
    bannerImage: string;
    images: string[];
    roomOptions: string[];
    bookings: Booking[];
}

const RoomOverview: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [showOverview, setShowOverview] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomRecord | null>(null);
    
    // Sample bookings for rooms
    const sampleRoomBookings: Booking[] = [
        {
            id: '2',
            guestName: 'Sarah Johnson',
            startDate: new Date('2025-01-20'),
            endDate: new Date('2025-01-22'),
            status: 'checked-in',
            phone: '+1 (555) 987-6543',
            email: 'sarah.johnson@email.com'
        },
        {
            id: '4',
            guestName: 'Emily Davis',
            startDate: new Date('2025-02-01'),
            endDate: new Date('2025-02-03'),
            status: 'confirmed',
            phone: '+1 (555) 321-0987',
            email: 'emily.davis@email.com'
        }
    ];

    const getRoomTypeData = (roomTypeId: string) => {
        const roomTypes: Record<string, { name: string; rooms: RoomRecord[] }> = {
            'deluxe-double': {
                name: 'Deluxe Double Sharing Room',
                rooms: [
                    { 
                        roomNumber: 'DD-101', 
                        name: 'Ocean Breeze Double', 
                        capacity: 2, 
                        price: 15000, 
                        status: 'available', 
                        bannerImage: '/assets/images/stay-with-us/double room 1.webp',
                        images: [
                            '/assets/images/stay-with-us/double room 1.webp',
                            '/assets/images/stay-with-us/double room 2.webp',
                            '/assets/images/stay-with-us/double room 3.webp'
                        ],
                        roomOptions: ['Sea View', 'Air Conditioning', 'Private Balcony', 'Mini Bar'],
                        bookings: sampleRoomBookings 
                    },
                    { 
                        roomNumber: 'DD-102', 
                        name: 'Sunset Double', 
                        capacity: 2, 
                        price: 16000, 
                        status: 'occupied', 
                        bannerImage: '/assets/images/stay-with-us/double room 2.webp',
                        images: [
                            '/assets/images/stay-with-us/double room 2.webp',
                            '/assets/images/stay-with-us/double room 4.webp'
                        ],
                        roomOptions: ['Sunset View', 'Air Conditioning', 'Kitchenette'],
                        bookings: sampleRoomBookings 
                    },
                    { 
                        roomNumber: 'DD-103', 
                        name: 'Garden Double', 
                        capacity: 2, 
                        price: 14000, 
                        status: 'maintenance', 
                        bannerImage: '/assets/images/stay-with-us/double room 3.webp',
                        images: ['/assets/images/stay-with-us/double room 3.webp'],
                        roomOptions: ['Garden View', 'Air Conditioning', 'Tea/Coffee Facilities'],
                        bookings: [] 
                    },
                ]
            },
            'deluxe-triple': {
                name: 'Deluxe Triple Sharing Room',
                rooms: [
                    { 
                        roomNumber: 'DT-201', 
                        name: 'Family Triple', 
                        capacity: 3, 
                        price: 22500, 
                        status: 'available', 
                        bannerImage: '/assets/images/stay-with-us/triple room 1.webp',
                        images: [
                            '/assets/images/stay-with-us/triple room 1.webp',
                            '/assets/images/stay-with-us/triple room 2.webp'
                        ],
                        roomOptions: ['Sea View', 'Air Conditioning', 'Extra Bed', 'Mini Fridge'],
                        bookings: [] 
                    },
                    { 
                        roomNumber: 'DT-202', 
                        name: 'Coastal Triple', 
                        capacity: 3, 
                        price: 23000, 
                        status: 'cleaning', 
                        bannerImage: '/assets/images/stay-with-us/triple room 3.webp',
                        images: ['/assets/images/stay-with-us/triple room 3.webp'],
                        roomOptions: ['Ocean View', 'Air Conditioning', 'Sofa Bed', 'Microwave'],
                        bookings: sampleRoomBookings 
                    },
                ]
            },
            'family-suite': {
                name: 'Family Suite',
                rooms: [
                    { 
                        roomNumber: 'FS-301', 
                        name: 'Premium Family Suite', 
                        capacity: 5, 
                        price: 35000, 
                        status: 'available', 
                        bannerImage: '/assets/images/home/Explore Our Luxury Accommodation 1.webp',
                        images: ['/assets/images/home/Explore Our Luxury Accommodation 1.webp'],
                        roomOptions: ['Separate Living Room', 'Kitchen', 'Two Bedrooms', 'Sea View Balcony'],
                        bookings: [] 
                    },
                ]
            },
            'premium-suite': {
                name: 'Premium Suite',
                rooms: [
                    { 
                        roomNumber: 'PS-401', 
                        name: 'Presidential Suite', 
                        capacity: 4, 
                        price: 45000, 
                        status: 'ready', 
                        bannerImage: '/assets/images/home/Explore Our Luxury Accommodation 2.webp',
                        images: ['/assets/images/home/Explore Our Luxury Accommodation 2.webp'],
                        roomOptions: ['Panoramic Ocean View', 'Jacuzzi', 'Private Terrace', 'Butler Service'],
                        bookings: sampleRoomBookings 
                    },
                ]
            }
        };
        return roomTypes[roomTypeId || ''] || { name: 'Unknown', rooms: [] };
    };

    const [data, setData] = useState<RoomRecord[]>(getRoomTypeData(id).rooms);
    const roomTypeName = getRoomTypeData(id).name;

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedRoomRecord, setSelectedRoomRecord] = useState<RoomRecord | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaArrowLeftIcon = FaArrowLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const toggleRoomStatus = (roomNumber: string, newStatus: RoomRecord['status']) => {
        setData(prev =>
            prev.map(room =>
                room.roomNumber === roomNumber
                    ? { ...room, status: newStatus }
                    : room
            )
        );
    };

    const handleAddRoom = (values: any) => {
        const newRoom: RoomRecord = {
            roomNumber: values.roomNumber,
            name: values.name,
            capacity: values.capacity,
            price: values.price,
            status: values.status,
            bannerImage: '/assets/images/stay-with-us/double room 1.webp', // Default image
            images: ['/assets/images/stay-with-us/double room 1.webp'],
            roomOptions: values.roomOptions ? values.roomOptions.split(',').map((opt: string) => opt.trim()) : [],
            bookings: [],
        };
        setData(prev => [...prev, newRoom]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const handleViewRoomDetails = (room: RoomRecord) => {
        const roomData: OverviewData = {
            title: `Room ${room.roomNumber}`,
            subtitle: `${room.name} • ${room.capacity} Guests • LKR ${room.price.toLocaleString()}/night`,
            status: room.status,
            statusOptions: ['available', 'occupied', 'maintenance', 'cleaning', 'ready'],
            totalBookings: room.bookings.length,
            revenue: `LKR ${room.price.toLocaleString()}`,
            occupancyText: room.status === 'occupied' ? 'Room is currently occupied' : 'Room is available',
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

    if (showOverview && selectedRoom) {
        const roomData: OverviewData = {
            title: `Room ${selectedRoom.roomNumber}`,
            subtitle: `${selectedRoom.name} • ${selectedRoom.capacity} Guests • LKR ${selectedRoom.price.toLocaleString()}/night`,
            status: selectedRoom.status,
            statusOptions: ['available', 'occupied', 'maintenance', 'cleaning', 'ready'],
            totalBookings: selectedRoom.bookings.length,
            revenue: `LKR ${selectedRoom.price.toLocaleString()}`,
            occupancyText: selectedRoom.status === 'occupied' ? 'Room is currently occupied' : 'Room is available',
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
            title: 'Room Number', 
            dataIndex: 'roomNumber',
            render: (roomNumber: string) => <span className="font-semibold">{roomNumber}</span>
        },
        { 
            title: 'Room Name', 
            dataIndex: 'name',
            render: (name: string) => <span className="font-medium">{name}</span>
        },
        { 
            title: 'Capacity', 
            dataIndex: 'capacity',
            render: (capacity: number) => <span>{capacity} guests</span>
        },
        { 
            title: 'Price/Night', 
            dataIndex: 'price',
            render: (price: number) => <span className="font-medium text-green-600">LKR {price.toLocaleString()}</span>
        },
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
            render: (status: RoomRecord['status']) => {
                const colorMap = {
                    available: 'green',
                    occupied: 'blue',
                    maintenance: 'red',
                    cleaning: 'orange',
                    ready: 'cyan',
                };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => handleViewRoomDetails(record)}>
                        <FaEyeIcon className="h-4 w-4" />
                        Details
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedRoomRecord(record);
                        setViewModalOpen(true);
                    }}>
                        Edit
                    </Button>
                    <Select
                        size="small"
                        value={record.status}
                        onChange={(value) => toggleRoomStatus(record.roomNumber, value)}
                        style={{ width: 120 }}
                    >
                        <Option value="available">Available</Option>
                        <Option value="occupied">Occupied</Option>
                        <Option value="maintenance">Maintenance</Option>
                        <Option value="cleaning">Cleaning</Option>
                        <Option value="ready">Ready</Option>
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
                    onClick={() => navigate('/admin/rooms-management')}
                >
                    Back to Room Types
                </Button>
                <h1 className="text-xl font-semibold">{roomTypeName} - Rooms</h1>
            </div>

            <PageHeaderWithActions
                title={`${roomTypeName} Rooms`}
                onNewClick={() => setAddModalOpen(true)}
                newButtonLabel="Add New Room"
                showFilter={false}
                showSearch={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="roomNumber"
                    pagination={false}
                />
            </div>

            {/* View Room Modal */}
            <Modal
                open={viewModalOpen}
                title="Room Details"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedRoomRecord(null);
                }}
                centered
                destroyOnClose
                width={800}
            >
                {selectedRoomRecord && (
                    <div className="space-y-4">
                        <Descriptions column={2} bordered>
                            <Descriptions.Item label="Room Number">{selectedRoomRecord.roomNumber}</Descriptions.Item>
                            <Descriptions.Item label="Room Name">{selectedRoomRecord.name}</Descriptions.Item>
                            <Descriptions.Item label="Capacity">{selectedRoomRecord.capacity} guests</Descriptions.Item>
                            <Descriptions.Item label="Price/Night">LKR {selectedRoomRecord.price.toLocaleString()}</Descriptions.Item>
                            <Descriptions.Item label="Current Bookings">{selectedRoomRecord.bookings.length}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={
                                    selectedRoomRecord.status === 'available' ? 'green' :
                                    selectedRoomRecord.status === 'occupied' ? 'blue' :
                                    selectedRoomRecord.status === 'maintenance' ? 'red' :
                                    selectedRoomRecord.status === 'cleaning' ? 'orange' : 'cyan'
                                }>
                                    {selectedRoomRecord.status}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                        
                        <div>
                            <h4 className="font-semibold mb-2">Room Options</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedRoomRecord.roomOptions.map((option, index) => (
                                    <Tag key={index} color="blue">{option}</Tag>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Banner Image</h4>
                            <img 
                                src={selectedRoomRecord.bannerImage} 
                                alt="Room Banner" 
                                className="w-full h-40 object-cover rounded"
                            />
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Room Images ({selectedRoomRecord.images.length})</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {selectedRoomRecord.images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image} 
                                        alt={`Room ${index + 1}`} 
                                        className="w-full h-20 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Room Modal */}
            <Modal
                open={addModalOpen}
                title={`Add New Room to ${roomTypeName}`}
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
                destroyOnClose
                width={600}
            >
                <Form layout="vertical" form={form} onFinish={handleAddRoom}>
                    <Form.Item
                        label="Room Number"
                        name="roomNumber"
                        rules={[{ required: true, message: 'Please enter room number' }]}
                    >
                        <Input placeholder="e.g., DD-104, DT-203, FS-302" />
                    </Form.Item>
                    <Form.Item
                        label="Room Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter room name' }]}
                    >
                        <Input placeholder="e.g., Ocean Breeze Double, Sunset Triple" />
                    </Form.Item>
                    <Form.Item
                        label="Capacity (Number of Guests)"
                        name="capacity"
                        rules={[{ required: true, message: 'Please enter capacity' }]}
                    >
                        <InputNumber min={1} max={10} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Price per Night (LKR)"
                        name="price"
                        rules={[{ required: true, message: 'Please enter price' }]}
                    >
                        <InputNumber min={1000} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select placeholder="Select status">
                            <Option value="available">Available</Option>
                            <Option value="occupied">Occupied</Option>
                            <Option value="maintenance">Maintenance</Option>
                            <Option value="cleaning">Cleaning</Option>
                            <Option value="ready">Ready</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Room Options (comma separated)"
                        name="roomOptions"
                        help="e.g., Sea View, Air Conditioning, Private Balcony, Mini Bar"
                    >
                        <TextArea 
                            rows={2} 
                            placeholder="Sea View, Air Conditioning, Private Balcony, Mini Bar"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Banner Image"
                        name="bannerImage"
                        help="Upload main room image"
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Upload Banner</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Room Images"
                        name="images"
                        help="Upload additional room images"
                    >
                        <Upload
                            listType="picture"
                            multiple
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Add Room
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RoomOverview;