import React, { useState, useMemo } from 'react';
import {
    Button,
    Modal,
    Space,
    Table,
    Tag,
    Descriptions,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';

interface RoomBooking {
    id: number;
    guest: string;
    room: string;
    checkIn: string;
    checkOut: string;
    amount: string;
    payment: 'paid' | 'pending' | 'failed';
    status: 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';
}

const RoomBookings: React.FC = () => {
    const [data, setData] = useState<RoomBooking[]>([
        { id: 1, guest: 'Alice Johnson', room: '101', checkIn: '2025-01-15', checkOut: '2025-01-18', amount: '$450.00', payment: 'paid', status: 'confirmed' },
        { id: 2, guest: 'Michael Wilson', room: '205', checkIn: '2025-01-16', checkOut: '2025-01-19', amount: '$500.00', payment: 'pending', status: 'confirmed' },
        { id: 3, guest: 'Sarah Davis', room: '304', checkIn: '2025-01-14', checkOut: '2025-01-15', amount: '$150.00', payment: 'paid', status: 'checked-out' },
        { id: 4, guest: 'David Miller', room: '102', checkIn: '2025-01-15', checkOut: '2025-01-20', amount: '$750.00', payment: 'paid', status: 'checked-in' },
        { id: 5, guest: 'Linda Thompson', room: '207', checkIn: '2025-01-17', checkOut: '2025-01-19', amount: '$0.00', payment: 'failed', status: 'cancelled' },
        { id: 6, guest: 'James Brown', room: '305', checkIn: '2025-01-18', checkOut: '2025-01-20', amount: '$300.00', payment: 'paid', status: 'confirmed' },
        { id: 7, guest: 'Emily Garcia', room: '404', checkIn: '2025-01-19', checkOut: '2025-01-22', amount: '$600.00', payment: 'pending', status: 'confirmed' },
        { id: 8, guest: 'Robert Martinez', room: '506', checkIn: '2025-01-20', checkOut: '2025-01-23', amount: '$800.00', payment: 'paid', status: 'checked-in' },
        { id: 9, guest: 'Jessica Anderson', room: '607', checkIn: '2025-01-21', checkOut: '2025-01-24', amount: '$900.00', payment: 'failed', status: 'cancelled' },
        { id: 10, guest: 'William Taylor', room: '708', checkIn: '2025-01-22', checkOut: '2025-01-25', amount: '$1000.00', payment: 'paid', status: 'checked-out' },
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<RoomBooking | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredData = useMemo(() => {
        return data.filter((record) => {
            const matchesSearch = record.guest.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = filterStatus === 'all' || record.status === filterStatus || record.payment === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [data, searchText, filterStatus]);

    const columns: ColumnsType<RoomBooking> = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Guest Name', dataIndex: 'guest' },
        { title: 'Room', dataIndex: 'room' },
        { title: 'Check-in', dataIndex: 'checkIn' },
        { title: 'Check-out', dataIndex: 'checkOut' },
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
                showNewButton={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 5 }}
                    rowKey="id"
                />
            </div>

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
                        <Descriptions.Item label="Room">{selectedRecord.room}</Descriptions.Item>
                        <Descriptions.Item label="Check-in">{selectedRecord.checkIn}</Descriptions.Item>
                        <Descriptions.Item label="Check-out">{selectedRecord.checkOut}</Descriptions.Item>
                        <Descriptions.Item label="Amount">{selectedRecord.amount}</Descriptions.Item>
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
