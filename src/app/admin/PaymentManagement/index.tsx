import React, { useState, useMemo } from 'react';
import { 
    Card, 
    Table, 
    Tag, 
    Button, 
    Modal, 
    Input, 
    Select, 
    Space, 
    Descriptions,
    message,
    Popconfirm,
    Tabs
} from 'antd';
import { 
    CreditCardOutlined, 
    ExclamationCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    DollarOutlined
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface PaymentRecord {
    id: string;
    type: 'room' | 'table';
    bookingId: string;
    guestName: string;
    email: string;
    phone: string;
    amount: number;
    currency: string;
    paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded' | 'cancelled';
    bookingStatus: 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out' | 'completed';
    paymentMethod: string;
    transactionId?: string;
    bookingDate: string;
    serviceDate: string;
    failureReason?: string;
    refundAmount?: number;
    refundDate?: string;
    notes?: string;
}

const PaymentManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(null);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [actionType, setActionType] = useState<'refund' | 'cancel' | 'contact' | null>(null);
    const [refundAmount, setRefundAmount] = useState<number>(0);
    const [refundReason, setRefundReason] = useState('');
    const [contactNotes, setContactNotes] = useState('');

    // Sample payment data
    const [data, setData] = useState<PaymentRecord[]>([
        {
            id: 'PAY-001',
            type: 'room',
            bookingId: 'ROOM-2025-001',
            guestName: 'Alice Johnson',
            email: 'alice@example.com',
            phone: '+1234567890',
            amount: 45000,
            currency: 'LKR',
            paymentStatus: 'paid',
            bookingStatus: 'confirmed',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-ABC123',
            bookingDate: '2025-01-10',
            serviceDate: '2025-01-15',
        },
        {
            id: 'PAY-002',
            type: 'table',
            bookingId: 'TABLE-2025-001',
            guestName: 'Michael Wilson',
            email: 'michael@example.com',
            phone: '+1987654321',
            amount: 8500,
            currency: 'LKR',
            paymentStatus: 'failed',
            bookingStatus: 'cancelled',
            paymentMethod: 'Credit Card',
            bookingDate: '2025-01-12',
            serviceDate: '2025-01-16',
            failureReason: 'Insufficient funds',
        },
        {
            id: 'PAY-003',
            type: 'room',
            bookingId: 'ROOM-2025-002',
            guestName: 'Sarah Davis',
            email: 'sarah@example.com',
            phone: '+1122334455',
            amount: 32000,
            currency: 'LKR',
            paymentStatus: 'pending',
            bookingStatus: 'confirmed',
            paymentMethod: 'Bank Transfer',
            bookingDate: '2025-01-13',
            serviceDate: '2025-01-18',
        },
        {
            id: 'PAY-004',
            type: 'table',
            bookingId: 'TABLE-2025-002',
            guestName: 'David Miller',
            email: 'david@example.com',
            phone: '+1555666777',
            amount: 12000,
            currency: 'LKR',
            paymentStatus: 'refunded',
            bookingStatus: 'cancelled',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-DEF456',
            bookingDate: '2025-01-08',
            serviceDate: '2025-01-14',
            refundAmount: 12000,
            refundDate: '2025-01-09',
        },
        {
            id: 'PAY-005',
            type: 'room',
            bookingId: 'ROOM-2025-003',
            guestName: 'Linda Thompson',
            email: 'linda@example.com',
            phone: '+1888999000',
            amount: 28000,
            currency: 'LKR',
            paymentStatus: 'failed',
            bookingStatus: 'cancelled',
            paymentMethod: 'Debit Card',
            bookingDate: '2025-01-14',
            serviceDate: '2025-01-20',
            failureReason: 'Card declined',
        },
    ]);

    // Sort data by booking date (latest first)
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
    }, [data]);

    const filteredData = useMemo(() => {
        return sortedData.filter((record) => {
            const matchesSearch = 
                record.guestName.toLowerCase().includes(searchText.toLowerCase()) ||
                record.email.toLowerCase().includes(searchText.toLowerCase()) ||
                record.bookingId.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = filterStatus === 'all' || record.paymentStatus === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [sortedData, searchText, filterStatus]);

    const failedPayments = filteredData.filter(record => record.paymentStatus === 'failed');
    const pendingPayments = filteredData.filter(record => record.paymentStatus === 'pending');

    const handleAction = (record: PaymentRecord, action: 'refund' | 'cancel' | 'contact') => {
        setSelectedRecord(record);
        setActionType(action);
        setRefundAmount(action === 'refund' ? record.amount : 0);
        setActionModalOpen(true);
    };

    const processAction = () => {
        if (!selectedRecord || !actionType) return;

        const updatedData = data.map(record => {
            if (record.id === selectedRecord.id) {
                switch (actionType) {
                    case 'refund':
                        return {
                            ...record,
                            paymentStatus: 'refunded' as const,
                            bookingStatus: 'cancelled' as const,
                            refundAmount,
                            refundDate: new Date().toISOString().split('T')[0],
                            notes: refundReason,
                        };
                    case 'cancel':
                        return {
                            ...record,
                            paymentStatus: 'cancelled' as const,
                            bookingStatus: 'cancelled' as const,
                            notes: refundReason,
                        };
                    case 'contact':
                        return {
                            ...record,
                            notes: contactNotes,
                        };
                    default:
                        return record;
                }
            }
            return record;
        });

        setData(updatedData);
        setActionModalOpen(false);
        setRefundAmount(0);
        setRefundReason('');
        setContactNotes('');
        
        message.success(`${actionType === 'contact' ? 'Contact notes added' : actionType === 'refund' ? 'Refund processed' : 'Booking cancelled'} successfully`);
    };

    const columns: ColumnsType<PaymentRecord> = [
        { 
            title: 'Booking ID', 
            dataIndex: 'bookingId',
            render: (id: string, record: PaymentRecord) => (
                <div>
                    <div className="font-medium">{id}</div>
                    <Tag color={record.type === 'room' ? 'blue' : 'green'} size="small">
                        {record.type === 'room' ? 'Room' : 'Table'}
                    </Tag>
                </div>
            )
        },
        { 
            title: 'Guest', 
            dataIndex: 'guestName',
            render: (name: string, record: PaymentRecord) => (
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">{record.email}</div>
                </div>
            )
        },
        { 
            title: 'Amount', 
            dataIndex: 'amount',
            render: (amount: number, record: PaymentRecord) => (
                <div className="font-medium">
                    {record.currency} {amount.toLocaleString()}
                </div>
            )
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            render: (status: string) => {
                const colors: Record<string, string> = {
                    paid: 'green',
                    pending: 'gold',
                    failed: 'red',
                    refunded: 'purple',
                    cancelled: 'default',
                };
                return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            render: (status: string) => {
                const colors: Record<string, string> = {
                    confirmed: 'green',
                    cancelled: 'red',
                    'checked-in': 'blue',
                    'checked-out': 'purple',
                    completed: 'cyan',
                };
                return <Tag color={colors[status]}>{status}</Tag>;
            },
        },
        { title: 'Service Date', dataIndex: 'serviceDate' },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    {record.paymentStatus === 'paid' && record.bookingStatus !== 'cancelled' && (
                        <Button 
                            size="small" 
                            danger
                            onClick={() => handleAction(record, 'refund')}
                        >
                            Refund
                        </Button>
                    )}
                    {record.paymentStatus === 'pending' && (
                        <Button 
                            size="small" 
                            danger
                            onClick={() => handleAction(record, 'cancel')}
                        >
                            Cancel
                        </Button>
                    )}
                    {record.paymentStatus === 'failed' && (
                        <Button 
                            size="small" 
                            type="primary"
                            icon={<PhoneOutlined />}
                            onClick={() => handleAction(record, 'contact')}
                        >
                            Contact
                        </Button>
                    )}
                    <Button 
                        size="small"
                        onClick={() => {
                            setSelectedRecord(record);
                            setActionType(null);
                            setActionModalOpen(true);
                        }}
                    >
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeaderWithActions
                title="Payment Management"
                onSearch={(value) => setSearchText(value)}
                onFilterChange={(value) => setFilterStatus(value)}
                showNewButton={false}
                filterOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Paid', value: 'paid' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'Failed', value: 'failed' },
                    { label: 'Refunded', value: 'refunded' },
                    { label: 'Cancelled', value: 'cancelled' },
                ]}
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Failed Payments</p>
                            <p className="text-2xl font-bold text-red-600">{failedPayments.length}</p>
                            <p className="text-xs text-gray-500">Need follow-up calls</p>
                        </div>
                        <ExclamationCircleOutlined className="text-3xl text-red-500" />
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Payments</p>
                            <p className="text-2xl font-bold text-orange-600">{pendingPayments.length}</p>
                            <p className="text-xs text-gray-500">Awaiting confirmation</p>
                        </div>
                        <CreditCardOutlined className="text-3xl text-orange-500" />
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600">
                                LKR {data.filter(r => r.paymentStatus === 'paid').reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">From successful payments</p>
                        </div>
                        <DollarOutlined className="text-3xl text-green-500" />
                    </div>
                </Card>
            </div>

            {/* Main Table */}
            <Card title="Payment Records">
                <Tabs defaultActiveKey="all">
                    <TabPane tab="All Payments" key="all">
                        <div className="overflow-x-auto">
                            <Table
                                columns={columns}
                                dataSource={filteredData}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={`Failed Payments (${failedPayments.length})`} key="failed">
                        <div className="overflow-x-auto">
                            <Table
                                columns={columns}
                                dataSource={failedPayments}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={`Pending Payments (${pendingPayments.length})`} key="pending">
                        <div className="overflow-x-auto">
                            <Table
                                columns={columns}
                                dataSource={pendingPayments}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Card>

            {/* Action Modal */}
            <Modal
                title={
                    actionType === 'refund' ? 'Process Refund' :
                    actionType === 'cancel' ? 'Cancel Booking' :
                    actionType === 'contact' ? 'Contact Guest' : 'Payment Details'
                }
                open={actionModalOpen}
                onCancel={() => {
                    setActionModalOpen(false);
                    setRefundAmount(0);
                    setRefundReason('');
                    setContactNotes('');
                }}
                footer={
                    actionType ? [
                        <Button key="cancel" onClick={() => setActionModalOpen(false)}>
                            Cancel
                        </Button>,
                        <Popconfirm
                            key="confirm"
                            title={`Are you sure you want to ${actionType} this booking?`}
                            onConfirm={processAction}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger={actionType !== 'contact'}>
                                {actionType === 'refund' ? 'Process Refund' : 
                                 actionType === 'cancel' ? 'Cancel Booking' : 'Save Notes'}
                            </Button>
                        </Popconfirm>
                    ] : [
                        <Button key="close" onClick={() => setActionModalOpen(false)}>
                            Close
                        </Button>
                    ]
                }
                width={600}
            >
                {selectedRecord && (
                    <div className="space-y-4">
                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Booking ID">{selectedRecord.bookingId}</Descriptions.Item>
                            <Descriptions.Item label="Guest">{selectedRecord.guestName}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedRecord.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{selectedRecord.phone}</Descriptions.Item>
                            <Descriptions.Item label="Amount">
                                {selectedRecord.currency} {selectedRecord.amount.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Payment Method">{selectedRecord.paymentMethod}</Descriptions.Item>
                            {selectedRecord.transactionId && (
                                <Descriptions.Item label="Transaction ID">{selectedRecord.transactionId}</Descriptions.Item>
                            )}
                            {selectedRecord.failureReason && (
                                <Descriptions.Item label="Failure Reason">
                                    <span className="text-red-600">{selectedRecord.failureReason}</span>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {actionType === 'refund' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Refund Amount</label>
                                    <Input
                                        type="number"
                                        value={refundAmount}
                                        onChange={(e) => setRefundAmount(Number(e.target.value))}
                                        addonBefore={selectedRecord.currency}
                                        max={selectedRecord.amount}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Refund Reason</label>
                                    <TextArea
                                        value={refundReason}
                                        onChange={(e) => setRefundReason(e.target.value)}
                                        placeholder="Enter reason for refund..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                        )}

                        {actionType === 'cancel' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Cancellation Reason</label>
                                <TextArea
                                    value={refundReason}
                                    onChange={(e) => setRefundReason(e.target.value)}
                                    placeholder="Enter reason for cancellation..."
                                    rows={3}
                                />
                            </div>
                        )}

                        {actionType === 'contact' && (
                            <div className="space-y-3">
                                <div className="bg-red-50 p-3 rounded border">
                                    <p className="text-sm font-medium text-red-800 mb-2">
                                        <PhoneOutlined className="mr-2" />
                                        Failed Payment - Contact Required
                                    </p>
                                    <p className="text-sm text-red-700">
                                        Reason: {selectedRecord.failureReason}
                                    </p>
                                    <p className="text-sm text-red-700 mt-1">
                                        <MailOutlined className="mr-1" />
                                        {selectedRecord.email} | <PhoneOutlined className="mr-1" />
                                        {selectedRecord.phone}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contact Notes</label>
                                    <TextArea
                                        value={contactNotes}
                                        onChange={(e) => setContactNotes(e.target.value)}
                                        placeholder="Record your conversation notes, follow-up actions, etc..."
                                        rows={4}
                                    />
                                </div>
                            </div>
                        )}

                        {selectedRecord.notes && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Previous Notes</label>
                                <div className="bg-gray-50 p-3 rounded text-sm">
                                    {selectedRecord.notes}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PaymentManagement;