import React, { useState, useMemo, useEffect } from 'react';
import {
    Button,
    Modal,
    Space,
    Table,
    Tag,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Descriptions,
    Select,
    InputNumber,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';
import PhoneInput from 'react-phone-input-2';

const { TextArea } = Input;
const { Option } = Select;

interface ReservationRecord {
    id: number;
    guest: string;
    table: string;
    date: string;
    time: string;
    status: 'confirmed' | 'cancelled';
    email?: string;
    phone?: string;
    partySize?: number;
    specialRequests?: string;
    arrivalTime?: string;
}

const TableReservations: React.FC = () => {
    const [data, setData] = useState<ReservationRecord[]>([
        { id: 1, guest: 'John Doe', table: 'T1', date: '2025-01-15', time: '19:00', status: 'confirmed', email: 'john@example.com', phone: '+1234567890', partySize: 4, specialRequests: 'Window seat preferred', arrivalTime: '19:00' },
        { id: 2, guest: 'Jane Smith', table: 'T3', date: '2025-01-15', time: '20:30', status: 'confirmed', email: 'jane@example.com', phone: '+1987654321', partySize: 2, specialRequests: 'Anniversary dinner', arrivalTime: '20:30' },
        { id: 3, guest: 'Robert Brown', table: 'T2', date: '2025-01-14', time: '18:00', status: 'cancelled', email: 'robert@example.com', phone: '+1122334455', partySize: 6, specialRequests: '', arrivalTime: '18:00' },
        { id: 4, guest: 'Emily Wilson', table: 'T5', date: '2025-01-16', time: '19:30', status: 'confirmed', email: 'emily@example.com', phone: '+1555666777', partySize: 3, specialRequests: 'Vegetarian options needed', arrivalTime: '19:30' },
        { id: 5, guest: 'Michael Lee', table: 'T4', date: '2025-01-16', time: '21:00', status: 'confirmed', email: 'michael@example.com', phone: '+1888999000', partySize: 5, specialRequests: 'Birthday celebration', arrivalTime: '21:00' },
        { id: 6, guest: 'Sarah Johnson', table: 'T6', date: '2025-01-17', time: '20:00', status: 'confirmed', email: 'sarah@example.com', phone: '+1777888999', partySize: 2, specialRequests: '', arrivalTime: '20:00' },
        { id: 7, guest: 'David Garcia', table: 'T7', date: '2025-01-18', time: '19:00', status: 'confirmed', email: 'david@example.com', phone: '+1666777888', partySize: 4, specialRequests: 'Quiet table please', arrivalTime: '19:00' },
        { id: 8, guest: 'Laura Martinez', table: 'T8', date: '2025-01-19', time: '20:30', status: 'confirmed', email: 'laura@example.com', phone: '+1555444333', partySize: 8, specialRequests: 'Large group, set menu preferred', arrivalTime: '20:30' },
        { id: 9, guest: 'James Anderson', table: 'T9', date: '2025-01-20', time: '18:00', status: 'cancelled', email: 'james@example.com', phone: '+1444333222', partySize: 3, specialRequests: '', arrivalTime: '18:00' },
        { id: 10, guest: 'Linda Thomas', table: 'T10', date: '2025-01-21', time: '19:30', status: 'confirmed', email: 'linda@example.com', phone: '+1333222111', partySize: 2, specialRequests: 'Allergy to seafood', arrivalTime: '19:30' },
    ]);

    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ReservationRecord | null>(null);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Filtered data based on search + status
    const filteredData = useMemo(() => {
        return data.filter((record) => {
            const matchesSearch = record.guest.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [data, searchText, filterStatus]);

    const handleNewReservation = (values: any) => {
        const newId = data.length + 1;
        const newRecord: ReservationRecord = {
            id: newId,
            guest: `${values.firstName} ${values.lastName}`,
            table: values.tableNumber,
            date: values.date.format('YYYY-MM-DD'),
            time: values.time.format('HH:mm'),
            status: 'confirmed',
            email: values.email,
            phone: phoneNumber,
            partySize: values.partySize,
            specialRequests: values.specialRequests,
            arrivalTime: values.arrivalTime,
        };
        setData((prev) => [...prev, newRecord]);
        setModalOpen(false);
        form.resetFields();
        setPhoneNumber('');
    };

    const columns: ColumnsType<ReservationRecord> = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Guest Name', dataIndex: 'guest' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Table Number', dataIndex: 'table' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Time', dataIndex: 'time' },
        { title: 'Party Size', dataIndex: 'partySize' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={status === 'confirmed' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => {
                        setSelectedRecord(record);
                        setViewModalOpen(true);
                    }}>
                        View
                    </Button>
                    <Button
                        size="small"
                        danger
                        disabled={record.status === 'cancelled'}
                        onClick={() =>
                            Modal.confirm({
                                title: 'Are you sure?',
                                content: `Cancel reservation for ${record.guest}?`,
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

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            <PageHeaderWithActions
                title="Table Reservations"
                onSearch={(value) => setSearchText(value)}
                onFilterChange={(value) => setFilterStatus(value)}
                onNewClick={() => setModalOpen(true)}
                newButtonLabel="New Reservation"
                filterOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Confirmed', value: 'confirmed' },
                    { label: 'Cancelled', value: 'cancelled' },
                ]}
                filterDefaultValue='all'
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6  whitespace-nowrap overflow-x-auto">
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            </div>

            {/* Add Reservation Modal */}
            <Modal
                open={modalOpen}
                title="New Table Reservation"
                onCancel={() => setModalOpen(false)}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleNewReservation}>
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
                            label="Reservation Date"
                            name="date"
                            rules={[{ required: true, message: 'Please select date' }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Reservation Time"
                            name="time"
                            rules={[{ required: true, message: 'Please select time' }]}
                        >
                            <TimePicker className="w-full" format="HH:mm" use12Hours />
                        </Form.Item>
                        <Form.Item
                            label="Table Number"
                            name="tableNumber"
                            rules={[{ required: true, message: 'Please select table' }]}
                        >
                            <Select placeholder="Select Table">
                                <Option value="T1">Table 1 (Beachfront)</Option>
                                <Option value="T2">Table 2 (Indoor)</Option>
                                <Option value="T3">Table 3 (Lounge)</Option>
                                <Option value="T4">Table 4 (Beachfront)</Option>
                                <Option value="T5">Table 5 (Indoor)</Option>
                                <Option value="T6">Table 6 (Lounge)</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Party Size"
                            name="partySize"
                            rules={[{ required: true, message: 'Please enter party size' }]}
                        >
                            <InputNumber min={1} max={20} className="w-full" placeholder="Number of guests" />
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                        label="Special Requests"
                        name="specialRequests"
                    >
                        <TextArea rows={3} placeholder="Any special requests or dietary requirements..." />
                    </Form.Item>
                    
                    <Form.Item
                        label="Preferred Arrival Time"
                        name="arrivalTime"
                        rules={[{ required: true, message: 'Please select arrival time' }]}
                    >
                        <Select placeholder="Select arrival time">
                            <Option value="18:00">6:00 PM</Option>
                            <Option value="18:30">6:30 PM</Option>
                            <Option value="19:00">7:00 PM</Option>
                            <Option value="19:30">7:30 PM</Option>
                            <Option value="20:00">8:00 PM</Option>
                            <Option value="20:30">8:30 PM</Option>
                            <Option value="21:00">9:00 PM</Option>
                            <Option value="21:30">9:30 PM</Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Create Reservation
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Reservation Modal */}
            <Modal
                open={viewModalOpen}
                title="Reservation Details"
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
                        <Descriptions.Item label="Table">{selectedRecord.table}</Descriptions.Item>
                        <Descriptions.Item label="Date">{selectedRecord.date}</Descriptions.Item>
                        <Descriptions.Item label="Time">{selectedRecord.time}</Descriptions.Item>
                        <Descriptions.Item label="Party Size">{selectedRecord.partySize} guests</Descriptions.Item>
                        <Descriptions.Item label="Arrival Time">{selectedRecord.arrivalTime}</Descriptions.Item>
                        {selectedRecord.specialRequests && (
                            <Descriptions.Item label="Special Requests">{selectedRecord.specialRequests}</Descriptions.Item>
                        )}
                        <Descriptions.Item label="Status">
                            <Tag color={selectedRecord.status === 'confirmed' ? 'green' : 'red'}>
                                {selectedRecord.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default TableReservations;
