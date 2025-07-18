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

interface Room {
    roomNumber: string;
    type: string;
    price: string;
    status: 'available' | 'occupied' | 'maintenance';
}

const RoomsManagement: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Room[]>([
        { roomNumber: '101', type: 'Deluxe', price: '$200', status: 'available' },
        { roomNumber: '102', type: 'Suite', price: '$350', status: 'occupied' },
        { roomNumber: '201', type: 'Standard', price: '$150', status: 'maintenance' },
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [form] = Form.useForm();
    const FaEyeIcon = FaEye as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const toggleRoomStatus = (roomNumber: string, block: boolean) => {
        setData((prev) =>
            prev.map((room) =>
                room.roomNumber === roomNumber
                    ? {
                        ...room,
                        status: block ? 'maintenance' : 'available',
                    }
                    : room
            )
        );
    };

    const handleAddRoom = (values: any) => {
        const newRoom: Room = {
            roomNumber: values.roomNumber,
            type: values.type,
            price: `$${values.price}`,
            status: values.status,
        };
        setData((prev) => [...prev, newRoom]);
        setAddModalOpen(false);
        form.resetFields();
    };

    const columns: ColumnsType<Room> = [
        { title: 'Room Number', dataIndex: 'roomNumber' },
        { title: 'Type', dataIndex: 'type' },
        { title: 'Price/Night', dataIndex: 'price' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: Room['status']) => {
                const colorMap = {
                    available: 'green',
                    occupied: 'blue',
                    maintenance: 'orange',
                };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => {
                        navigate(`/admin/rooms-management/${record.roomNumber}`);
                    }}>
                        <FaEyeIcon className="h-4 w-4" />
                    </Button>
                    <Button size="small" onClick={() => {
                        setSelectedRoom(record);
                        setViewModalOpen(true);
                    }}>
                        Edit
                    </Button>
                    {record.status === 'available' ? (
                        <Button size="small" danger onClick={() => toggleRoomStatus(record.roomNumber, true)}>
                            Block
                        </Button>
                    ) : (
                        <Button size="small" type="primary" onClick={() => toggleRoomStatus(record.roomNumber, false)}>
                            Unblock
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Rooms Management"
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
                    setSelectedRoom(null);
                }}
                centered
                destroyOnClose
            >
                {selectedRoom && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Room Number">{selectedRoom.roomNumber}</Descriptions.Item>
                        <Descriptions.Item label="Type">{selectedRoom.type}</Descriptions.Item>
                        <Descriptions.Item label="Price">{selectedRoom.price}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={
                                selectedRoom.status === 'available' ? 'green' :
                                    selectedRoom.status === 'occupied' ? 'blue' : 'orange'
                            }>
                                {selectedRoom.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Add Room Modal */}
            <Modal
                open={addModalOpen}
                title="Add New Room"
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleAddRoom}>
                    <Form.Item
                        label="Room Number"
                        name="roomNumber"
                        rules={[{ required: true, message: 'Please enter room number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please enter room type' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price (USD)"
                        name="price"
                        rules={[{ required: true, message: 'Please enter price' }]}
                    >
                        <Input type="number" />
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
                        </Select>
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

export default RoomsManagement;
