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
    Select,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const { Option } = Select;

interface RoomType {
    id: string;
    name: string;
    description: string;
    totalRooms: number;
    availableRooms: number;
    basePrice: string;
    maxCapacity: number;
}

const RoomsManagement: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<RoomType[]>([
        { 
            id: 'deluxe-double', 
            name: 'Deluxe Double Sharing Room', 
            description: 'A perfect coastal retreat for couples or two guests seeking a serene and stylish escape',
            totalRooms: 8,
            availableRooms: 6,
            basePrice: 'LKR 15,000',
            maxCapacity: 2
        },
        { 
            id: 'deluxe-triple', 
            name: 'Deluxe Triple Sharing Room', 
            description: 'Ideal for small families or a group of friends, offering extra space without compromising comfort',
            totalRooms: 6,
            availableRooms: 4,
            basePrice: 'LKR 22,500',
            maxCapacity: 3
        },
        { 
            id: 'family-suite', 
            name: 'Family Suite', 
            description: 'Spacious accommodation perfect for families with children, featuring separate living areas',
            totalRooms: 4,
            availableRooms: 3,
            basePrice: 'LKR 35,000',
            maxCapacity: 5
        },
        { 
            id: 'premium-suite', 
            name: 'Premium Suite', 
            description: 'Luxury accommodation with premium amenities and stunning ocean views',
            totalRooms: 3,
            availableRooms: 2,
            basePrice: 'LKR 45,000',
            maxCapacity: 4
        },
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const handleAddRoomType = (values: any) => {
        const newRoomType: RoomType = {
            id: values.name.toLowerCase().replace(/\s+/g, '-'),
            name: values.name,
            description: values.description,
            totalRooms: 0,
            availableRooms: 0,
            basePrice: `LKR ${values.basePrice}`,
            maxCapacity: values.maxCapacity,
        };
        setData((prev) => [...prev, newRoomType]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const columns: ColumnsType<RoomType> = [
        { 
            title: 'Room Type', 
            dataIndex: 'name',
            render: (name: string) => <span className="font-semibold">{name}</span>
        },
        { title: 'Description', dataIndex: 'description' },
        { 
            title: 'Base Price', 
            dataIndex: 'basePrice',
            render: (price: string) => <span className="font-medium text-green-600">{price}</span>
        },
        { 
            title: 'Max Capacity', 
            dataIndex: 'maxCapacity',
            render: (capacity: number) => <span className="font-medium">{capacity} guests</span>
        },
        { 
            title: 'Total Rooms', 
            dataIndex: 'totalRooms',
            render: (total: number) => <span className="font-medium">{total}</span>
        },
        { 
            title: 'Available', 
            dataIndex: 'availableRooms',
            render: (available: number, record: RoomType) => (
                <Tag color={available > 0 ? 'green' : 'red'}>
                    {available}/{record.totalRooms}
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
                            navigate(`/admin/rooms-management/${record.id}`);
                        }}
                    >
                        <FaEyeIcon className="h-4 w-4" />
                        View Rooms
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedRoomType(record);
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
                title="Room Management - Room Types"
                onNewClick={() => setAddModalOpen(true)}
                newButtonLabel="Add New Room Type"
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

            {/* View/Edit Room Type Modal */}
            <Modal
                open={viewModalOpen}
                title="Room Type Details"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedRoomType(null);
                }}
                centered
                destroyOnClose
            >
                {selectedRoomType && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">{selectedRoomType.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedRoomType.description}</Descriptions.Item>
                        <Descriptions.Item label="Base Price">{selectedRoomType.basePrice}</Descriptions.Item>
                        <Descriptions.Item label="Max Capacity">{selectedRoomType.maxCapacity} guests</Descriptions.Item>
                        <Descriptions.Item label="Total Rooms">{selectedRoomType.totalRooms}</Descriptions.Item>
                        <Descriptions.Item label="Available Rooms">
                            <Tag color={selectedRoomType.availableRooms > 0 ? 'green' : 'red'}>
                                {selectedRoomType.availableRooms}/{selectedRoomType.totalRooms}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Add Room Type Modal */}
            <Modal
                open={addModalOpen}
                title="Add New Room Type"
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleAddRoomType}>
                    <Form.Item
                        label="Room Type Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter room type name' }]}
                    >
                        <Input placeholder="e.g., Presidential Suite, Ocean View Villa" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Describe the room type and its features..." />
                    </Form.Item>
                    <Form.Item
                        label="Base Price (LKR)"
                        name="basePrice"
                        rules={[{ required: true, message: 'Please enter base price' }]}
                    >
                        <Input type="number" placeholder="15000" />
                    </Form.Item>
                    <Form.Item
                        label="Maximum Capacity"
                        name="maxCapacity"
                        rules={[{ required: true, message: 'Please enter maximum capacity' }]}
                    >
                        <Input type="number" placeholder="2" min={1} max={10} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Add Room Type
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RoomsManagement;