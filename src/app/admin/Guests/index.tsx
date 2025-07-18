import React, { useState, useMemo } from 'react';
import { Button, Modal, Space, Table, Tag, Descriptions } from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';

interface Guest {
    name: string;
    email: string;
    phone: string;
    totalReservations: number;
    totalBookings: number;
    status: 'active' | 'banned';
}

const Guests: React.FC = () => {
    const [data, setData] = useState<Guest[]>([
        { name: 'John Doe', email: 'john@example.com', phone: '+1234567890', totalReservations: 5, totalBookings: 3, status: 'active' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321', totalReservations: 2, totalBookings: 1, status: 'active' },
        { name: 'Bob Wilson', email: 'bob@example.com', phone: '+1122334455', totalReservations: 0, totalBookings: 0, status: 'banned' },
    ]);

    const [searchText, setSearchText] = useState('');
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

    const filteredData = useMemo(() => {
        return data.filter((guest) =>
            guest.name.toLowerCase().includes(searchText.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [data, searchText]);

    const toggleStatus = (email: string, ban: boolean) => {
        setData((prev) =>
            prev.map((g) =>
                g.email === email ? { ...g, status: ban ? 'banned' : 'active' } : g
            )
        );
    };

    const columns: ColumnsType<Guest> = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Total Reservations', dataIndex: 'totalReservations' },
        { title: 'Total Bookings', dataIndex: 'totalBookings' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: Guest['status']) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => {
                        setSelectedGuest(record);
                        setViewModalOpen(true);
                    }}>
                        View Profile
                    </Button>
                    {record.status === 'active' ? (
                        <Button size="small" danger onClick={() => toggleStatus(record.email, true)}>
                            Ban
                        </Button>
                    ) : (
                        <Button size="small" type="primary" onClick={() => toggleStatus(record.email, false)}>
                            Unban
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Guests"
                onSearch={(val) => setSearchText(val)}
                showFilter={false}
                showNewButton={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="email"
                    pagination={false}
                />
            </div>

            <Modal
                open={viewModalOpen}
                title="Guest Profile"
                footer={null}
                onCancel={() => {
                    setViewModalOpen(false);
                    setSelectedGuest(null);
                }}
                centered
                destroyOnClose
            >
                {selectedGuest && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">{selectedGuest.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedGuest.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{selectedGuest.phone}</Descriptions.Item>
                        <Descriptions.Item label="Reservations">{selectedGuest.totalReservations}</Descriptions.Item>
                        <Descriptions.Item label="Bookings">{selectedGuest.totalBookings}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={selectedGuest.status === 'active' ? 'green' : 'red'}>
                                {selectedGuest.status}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default Guests;
