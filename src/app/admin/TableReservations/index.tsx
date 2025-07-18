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
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';

interface ReservationRecord {
    id: number;
    guest: string;
    table: string;
    date: string;
    time: string;
    status: 'confirmed' | 'cancelled';
}

const TableReservations: React.FC = () => {
    const [data, setData] = useState<ReservationRecord[]>([
        { id: 1, guest: 'John Doe', table: 'T1', date: '2025-01-15', time: '19:00', status: 'confirmed' },
        { id: 2, guest: 'Jane Smith', table: 'T3', date: '2025-01-15', time: '20:30', status: 'confirmed' },
        { id: 3, guest: 'Robert Brown', table: 'T2', date: '2025-01-14', time: '18:00', status: 'cancelled' },
        { id: 4, guest: 'Emily Wilson', table: 'T5', date: '2025-01-16', time: '19:30', status: 'confirmed' },
        { id: 5, guest: 'Michael Lee', table: 'T4', date: '2025-01-16', time: '21:00', status: 'confirmed' },
        { id: 6, guest: 'Sarah Johnson', table: 'T6', date: '2025-01-17', time: '20:00', status: 'confirmed' },
        { id: 7, guest: 'David Garcia', table: 'T7', date: '2025-01-18', time: '19:00', status: 'confirmed' },
        { id: 8, guest: 'Laura Martinez', table: 'T8', date: '2025-01-19', time: '20:30', status: 'confirmed' },
        { id: 9, guest: 'James Anderson', table: 'T9', date: '2025-01-20', time: '18:00', status: 'cancelled' },
        { id: 10, guest: 'Linda Thomas', table: 'T10', date: '2025-01-21', time: '19:30', status: 'confirmed' },
    ]);

    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ReservationRecord | null>(null);
    const [loading, setLoading] = useState(false);

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
            guest: values.guest,
            table: values.table,
            date: values.date.format('YYYY-MM-DD'),
            time: values.time.format('HH:mm'),
            status: 'confirmed',
        };
        setData((prev) => [...prev, newRecord]);
        setModalOpen(false);
        form.resetFields();
    };

    const columns: ColumnsType<ReservationRecord> = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Guest Name', dataIndex: 'guest' },
        { title: 'Table Number', dataIndex: 'table' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Time', dataIndex: 'time' },
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
                    <Form.Item
                        label="Guest Name"
                        name="guest"
                        rules={[{ required: true, message: 'Please enter guest name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Table Number"
                        name="table"
                        rules={[{ required: true, message: 'Please enter table number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select date' }]}
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        name="time"
                        rules={[{ required: true, message: 'Please select time' }]}
                    >
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Add Reservation
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
                        <Descriptions.Item label="Table">{selectedRecord.table}</Descriptions.Item>
                        <Descriptions.Item label="Date">{selectedRecord.date}</Descriptions.Item>
                        <Descriptions.Item label="Time">{selectedRecord.time}</Descriptions.Item>
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
