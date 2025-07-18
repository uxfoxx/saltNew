import React, { useState } from 'react';
import {
    Button,
    Modal,
    Space,
    Table,
    Tag,
    Form,
    Input,
    Select,
} from 'antd';
import PageHeaderWithActions from '../../components/filter/PageHeaderWithActions';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface AdminUser {
    name: string;
    email: string;
    role: 'super-admin' | 'staff';
    status: 'active' | 'disabled';
}

const AdminUsers: React.FC = () => {
    const [data, setData] = useState<AdminUser[]>([
        { name: 'Admin User', email: 'admin@example.com', role: 'super-admin', status: 'active' },
        { name: 'Staff Member', email: 'staff@example.com', role: 'staff', status: 'active' },
        { name: 'Former Staff', email: 'former@example.com', role: 'staff', status: 'disabled' },
    ]);

    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [editMode, setEditMode] = useState(false);

    const toggleStatus = (email: string, disable: boolean) => {
        setData(prev =>
            prev.map(user =>
                user.email === email
                    ? { ...user, status: disable ? 'disabled' : 'active' }
                    : user
            )
        );
    };

    const handleAddOrEdit = (values: any) => {
        if (editMode && selectedUser) {
            setData(prev =>
                prev.map(user =>
                    user.email === selectedUser.email ? { ...user, ...values } : user
                )
            );
        } else {
            setData(prev => [...prev, { ...values, status: 'active' }]);
        }
        setModalOpen(false);
        setSelectedUser(null);
        setEditMode(false);
        form.resetFields();
    };

    const columns: ColumnsType<AdminUser> = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Role', dataIndex: 'role' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        onClick={() => {
                            form.setFieldsValue(record);
                            setSelectedUser(record);
                            setEditMode(true);
                            setModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    {record.status === 'active' ? (
                        <Button
                            size="small"
                            danger
                            onClick={() => toggleStatus(record.email, true)}
                        >
                            Disable
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => toggleStatus(record.email, false)}
                        >
                            Enable
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithActions
                title="Admin Users"
                onNewClick={() => {
                    setEditMode(false);
                    form.resetFields();
                    setModalOpen(true);
                }}
                newButtonLabel="Add New Admin"
                showFilter={false}
                showSearch={false}
            />

            <div className="p-4 bg-white rounded-lg shadow-custom6 whitespace-nowrap overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="email"
                    pagination={false}
                />
            </div>

            <Modal
                open={modalOpen}
                title={editMode ? 'Edit Admin User' : 'Add Admin User'}
                onCancel={() => {
                    setModalOpen(false);
                    setSelectedUser(null);
                    setEditMode(false);
                }}
                footer={null}
                centered
                destroyOnClose
            >
                <Form layout="vertical" form={form} onFinish={handleAddOrEdit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter email' }]}
                    >
                        <Input disabled={editMode} />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select role' }]}
                    >
                        <Select placeholder="Select role">
                            <Option value="super-admin">Super Admin</Option>
                            <Option value="staff">Staff</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            {editMode ? 'Update' : 'Add Admin'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUsers;
