import React, { useState, useMemo } from 'react';
import {
    Button,
    Modal,
    Space,
    Table,
    Tag,
    Descriptions,
    Form,
    Input,
    DatePicker,
    Select,
    InputNumber,
    Radio,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';
import PhoneInput from 'react-phone-input-2';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface RoomBooking {
    id: number;
    guest: string;
    room: string;
    checkIn: string;
    checkOut: string;
    amount: string;
    payment: 'paid' | 'pending' | 'failed';
    status: 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';
    email?: string;
    phone?: string;
    numberOfGuests?: number;
    roomType?: string;
    specialRequests?: string;
    arrivalTime?: string;
    mealPlan?: string;
}

const RoomBookings: React.FC = () => {
    const [data, setData] = useState<RoomBooking[]>([
        { id: 1, guest: 'Alice Johnson', room: '101', checkIn: '2025-01-15', checkOut: '2025-01-18', amount: '$450.00', payment: 'paid', status: 'confirmed', email: 'alice@example.com', phone: '+1234567890', numberOfGuests: 2, roomType: 'Deluxe Double', specialRequests: 'Late check-in', arrivalTime: '15:00', mealPlan: 'Bed & Breakfast' },
        { id: 2, guest: 'Michael Wilson', room: '205', checkIn: '2025-01-16', checkOut: '2025-01-19', amount: '$500.00', payment: 'pending', status: 'confirmed', email: 'michael@example.com', phone: '+1987654321', numberOfGuests: 3, roomType: 'Deluxe Triple', specialRequests: 'Ocean view preferred', arrivalTime: '14:30', mealPlan: 'Half Board' },
        { id: 3, guest: 'Sarah Davis', room: '304', checkIn: '2025-01-14', checkOut: '2025-01-15', amount: '$150.00', payment: 'paid', status: 'checked-out', email: 'sarah@example.com', phone: '+1122334455', numberOfGuests: 1, roomType: 'Standard Single', specialRequests: '', arrivalTime: '16:00', mealPlan: 'Room Only' },
        { id: 4, guest: 'David Miller', room: '102', checkIn: '2025-01-15', checkOut: '2025-01-20', amount: '$750.00', payment: 'paid', status: 'checked-in', email: 'david@example.com', phone: '+1555666777', numberOfGuests: 4, roomType: 'Family Suite', specialRequests: 'Extra bed required', arrivalTime: '14:30', mealPlan: 'All Inclusive' },
        { id: 5, guest: 'Linda Thompson', room: '207', checkIn: '2025-01-17', checkOut: '2025-01-19', amount: '$0.00', payment: 'failed', status: 'cancelled', email: 'linda@example.com', phone: '+1888999000', numberOfGuests: 2, roomType: 'Deluxe Double', specialRequests: 'Honeymoon package', arrivalTime: '15:30', mealPlan: 'Bed & Breakfast' },
        { id: 6, guest: 'James Brown', room: '305', checkIn: '2025-01-18', checkOut: '2025-01-20', amount: '$300.00', payment: 'paid', status: 'confirmed', email: 'james@example.com', phone: '+1777888999', numberOfGuests: 2, roomType: 'Standard Double', specialRequests: 'Ground floor room', arrivalTime: '16:30', mealPlan: 'Room Only' },
        { id: 7, guest: 'Emily Garcia', room: '404', checkIn: '2025-01-19', checkOut: '2025-01-22', amount: '$600.00', payment: 'pending', status: 'confirmed', email: 'emily@example.com', phone: '+1666777888', numberOfGuests: 3, roomType: 'Deluxe Triple', specialRequests: 'Vegetarian meals', arrivalTime: '14:30', mealPlan: 'Half Board' },
        { id: 8, guest: 'Robert Martinez', room: '506', checkIn: '2025-01-20', checkOut: '2025-01-23', amount: '$800.00', payment: 'paid', status: 'checked-in', email: 'robert@example.com', phone: '+1555444333', numberOfGuests: 2, roomType: 'Premium Suite', specialRequests: 'Anniversary celebration', arrivalTime: '15:00', mealPlan: 'All Inclusive' },
        { id: 9, guest: 'Jessica Anderson', room: '607', checkIn: '2025-01-21', checkOut: '2025-01-24', amount: '$900.00', payment: 'failed', status: 'cancelled', email: 'jessica@example.com', phone: '+1444333222', numberOfGuests: 4, roomType: 'Family Suite', specialRequests: 'Connecting rooms', arrivalTime: '16:00', mealPlan: 'Bed & Breakfast' },
        { id: 10, guest: 'William Taylor', room: '708', checkIn: '2025-01-22', checkOut: '2025-01-25', amount: '$1000.00', payment: 'paid', status: 'checked-out', email: 'william@example.com', phone: '+1333222111', numberOfGuests: 2, roomType: 'Presidential Suite', specialRequests: 'Airport transfer', arrivalTime: '14:30', mealPlan: 'All Inclusive' },
    ]);

    const [form] = Form.useForm();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<RoomBooking | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [phoneNumber, setPhoneNumber] = useState('');

    const filteredData = useMemo(() => {
        return data.filter((record) => {
            const matchesSearch = record.guest.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = filterStatus === 'all' || record.status === filterStatus || record.payment === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [data, searchText, filterStatus]);

    const handleNewBooking = (values: any) => {
        const newId = data.length + 1;
        const checkInDate = values.checkIn.format('YYYY-MM-DD');
        const checkOutDate = values.checkOut.format('YYYY-MM-DD');
        const nights = values.checkOut.diff(values.checkIn, 'days');
        const basePrice = 150; // Base price per night
        const totalAmount = nights * basePrice * (values.numberOfGuests || 1);
        
        const newRecord: RoomBooking = {
            id: newId,
            guest: `${values.firstName} ${values.lastName}`,
            room: values.roomNumber,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            amount: `$${totalAmount}.00`,
            payment: 'pending',
            status: 'confirmed',
            email: values.email,
            phone: phoneNumber,
            numberOfGuests: values.numberOfGuests,
            roomType: values.roomType,
            specialRequests: values.specialRequests,
            arrivalTime: values.arrivalTime,
            mealPlan: values.mealPlan,
        };
        setData((prev) => [...prev, newRecord]);
        setAddModalOpen(false);
        form.resetFields();
        setPhoneNumber('');
    };

    const columns: ColumnsType<RoomBooking> = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Guest Name', dataIndex: 'guest' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Room', dataIndex: 'room' },
        { title: 'Check-in', dataIndex: 'checkIn' },
        { title: 'Check-out', dataIndex: 'checkOut' },
        { title: 'Guests', dataIndex: 'numberOfGuests' },
        { title: 'Amount', dataIndex: 'amount' },
        {
            title: 'Payment',
            dataIndex: 'payment',
            render: (payment: string) => {
                const colors: Record<string, string> = {
                    paid: 'green',
                    pending: 'gold',
                    failed: 'red',
                };
                return <Tag color={colors[payment]}>{payment}</Tag>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => {
                const colors: Record<string, string> = {
                    confirmed: 'green',
                    cancelled: 'red',
                    'checked-in': 'blue',
                    'checked-out': 'purple',
                };
                return <Tag color={colors[status]}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => {
                        setSelectedRecord(record);
                        setViewModalOpen(true);
                    }}>View</Button>
                    <Button
                        size="small"
                        danger
                        disabled={record.status === 'cancelled'}
                        onClick={() =>
                            Modal.confirm({
                                title: 'Are you sure?',
                                content: `Cancel booking for ${record.guest}?`,
                                onOk: () => {
                                    setData((prev) =>
                                        prev.map((r) =>
                                            r.id === record.id ? { ...r, status: 'cancelled' } : r
                                        )
                                    );
                                },
                            })
                        }
                    >
                        Cancel
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Room Bookings"
                onSearch={(value) => setSearchText(value)}
                onFilterChange={(value) => setFilterStatus(value)}
                onNewClick={() => setAddModalOpen(true)}
                newButtonLabel="New Room Booking"
                filterOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Confirmed', value: 'confirmed' },
                    { label: 'Checked-in', value: 'checked-in' },
                    { label: 'Checked-out', value: 'checked-out' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'Paid', value: 'paid' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'Failed', value: 'failed' },
                ]}
                filterDefaultValue="all"
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            </div>

            {/* Add Room Booking Modal */}
            <Modal
                open={addModalOpen}
                title="New Room Booking"
                onCancel={() => {
                    setAddModalOpen(false);
                    form.resetFields();
                    setPhoneNumber('');
                }}
                footer={null}
                centered
                destroyOnClose
                width={800}
            >
                <Form layout="vertical" form={form} onFinish={handleNewBooking}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <PhoneInput
                                country={'lk'}
                                value={phoneNumber}
                                onChange={(phone) => setPhoneNumber(phone)}
                                inputStyle={{ width: '100%' }}
                                containerStyle={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Check-in Date"
                            name="checkIn"
                            rules={[{ required: true, message: 'Please select check-in date' }]}
                        >
                            <DatePicker 
                                className="w-full" 
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Check-out Date"
                            name="checkOut"
                            rules={[{ required: true, message: 'Please select check-out date' }]}
                        >
                            <DatePicker 
                                className="w-full"
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Number of Guests"
                            name="numberOfGuests"
                            rules={[{ required: true, message: 'Please enter number of guests' }]}
                        >
                            <InputNumber min={1} max={10} className="w-full" placeholder="Number of guests" />
                        </Form.Item>
                        <Form.Item
                            label="Room Type"
                            name="roomType"
                            rules={[{ required: true, message: 'Please select room type' }]}
                        >
                            <Select placeholder="Select Room Type">
                                <Option value="Deluxe Double">Deluxe Double Sharing Room</Option>
                                <Option value="Deluxe Triple">Deluxe Triple Sharing Room</Option>
                                <Option value="Standard Single">Standard Single Room</Option>
                                <Option value="Family Suite">Family Suite</Option>
                                <Option value="Premium Suite">Premium Suite</Option>
                                <Option value="Presidential Suite">Presidential Suite</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Room Number"
                            name="roomNumber"
                            rules={[{ required: true, message: 'Please enter room number' }]}
                        >
                            <Input placeholder="Room Number (e.g., 101)" />
                        </Form.Item>
                        <Form.Item
                            label="Preferred Arrival Time"
                            name="arrivalTime"
                            rules={[{ required: true, message: 'Please select arrival time' }]}
                        >
                            <Select placeholder="Select arrival time">
                                <Option value="14:30">2:30 PM</Option>
                                <Option value="15:00">3:00 PM</Option>
                                <Option value="15:30">3:30 PM</Option>
                                <Option value="16:00">4:00 PM</Option>
                                <Option value="16:30">4:30 PM</Option>
                                <Option value="17:00">5:00 PM</Option>
                                <Option value="17:30">5:30 PM</Option>
                                <Option value="18:00">6:00 PM</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                        label="Meal Plan"
                        name="mealPlan"
                        rules={[{ required: true, message: 'Please select meal plan' }]}
                    >
                        <Radio.Group>
                            <Radio value="Room Only">Room Only</Radio>
                            <Radio value="Bed & Breakfast">Bed & Breakfast</Radio>
                            <Radio value="Half Board">Half Board</Radio>
                            <Radio value="All Inclusive">All Inclusive</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Form.Item
                        label="Special Requests"
                        name="specialRequests"
                    >
                        <TextArea rows={3} placeholder="Any special requests, dietary requirements, or preferences..." />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Create Room Booking
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={viewModalOpen}
                title="Booking Details"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedRecord(null);
                }}
                centered
                destroyOnClose
            >
                {selectedRecord && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Guest">{selectedRecord.guest}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedRecord.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{selectedRecord.phone}</Descriptions.Item>
                        <Descriptions.Item label="Room">{selectedRecord.room}</Descriptions.Item>
                        <Descriptions.Item label="Room Type">{selectedRecord.roomType}</Descriptions.Item>
                        <Descriptions.Item label="Check-in">{selectedRecord.checkIn}</Descriptions.Item>
                        <Descriptions.Item label="Check-out">{selectedRecord.checkOut}</Descriptions.Item>
                        <Descriptions.Item label="Number of Guests">{selectedRecord.numberOfGuests}</Descriptions.Item>
                        <Descriptions.Item label="Meal Plan">{selectedRecord.mealPlan}</Descriptions.Item>
                        <Descriptions.Item label="Arrival Time">{selectedRecord.arrivalTime}</Descriptions.Item>
                        <Descriptions.Item label="Amount">{selectedRecord.amount}</Descriptions.Item>
                        {selectedRecord.specialRequests && (
                            <Descriptions.Item label="Special Requests">{selectedRecord.specialRequests}</Descriptions.Item>
                        )}
                        <Descriptions.Item label="Payment">
                            <Tag color={
                                selectedRecord.payment === 'paid' ? 'green' :
                                    selectedRecord.payment === 'pending' ? 'gold' : 'red'
                            }>
                                {selectedRecord.payment}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={
                                selectedRecord.status === 'confirmed' ? 'green' :
                                    selectedRecord.status === 'checked-in' ? 'blue' :
                                        selectedRecord.status === 'checked-out' ? 'purple' : 'red'
                            }>
                                {selectedRecord.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default RoomBookings;
