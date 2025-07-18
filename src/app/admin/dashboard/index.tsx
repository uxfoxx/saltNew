// import React from 'react'
// import { AdminHeadTitle } from '../../components'
// import adminNavigationConfig, { AdminNavigationItem } from "../../routes/adminNavigationConfig";
// import { useNavigate } from 'react-router-dom';
// import { useAppContext } from '../../../contexts/AppContext';
// const Dashboard: React.FC = () => {
//     const navigate = useNavigate();
//     const { user } = useAppContext();

//     const userType =
//         user?.userType === Number(process.env.REACT_APP_ADMIN)
//             ? 'ADMIN'
//             : user?.userType === Number(process.env.REACT_APP_MANAGER)
//                 ? 'MANAGER'
//                 : user?.userType === Number(process.env.REACT_APP_USER)
//                     ? 'USER'
//                     : 'GUEST';

//     const filteredNavigationConfig = adminNavigationConfig.filter((item: AdminNavigationItem) =>
//         item.role?.includes(userType)
//     );

//     return (
//         <div className='p-4'>
//             <AdminHeadTitle
//                 title='Dashboard'
//                 subtitle='Manage Dashboard'
//             />
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
//                 {filteredNavigationConfig && filteredNavigationConfig.map((item: AdminNavigationItem, index: number) => (
//                     <div
//                         key={index}
//                         className='bg-white p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg min-h-28'
//                         onClick={() => navigate(item.path)}
//                     >
//                         <div className='flex items-center gap-2 h-full'>
//                             <div className='bg-secondaryColor p-2 rounded-md'>
//                                 {item.icon}
//                             </div>
//                             <div>
//                                 <h1 className='text-lg font-semibold'>{item.title}</h1>
//                                 <p className='text-gray-500'>{item.subtitle}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Dashboard


import React from 'react';
import { Row, Col, Tag } from 'antd';
import {
    CalendarOutlined,
    DollarOutlined,
    UserOutlined,
    ApartmentOutlined,
} from '@ant-design/icons';
import StatCard from '../../components/card/StatCard';
import ChartCard from '../../components/card/ChartCard';
import TableCard from '../../components/card/TableCard';

const Dashboard: React.FC = () => {
    const statCards = [
        {
            title: 'Table Reservations Today',
            value: 12,
            change: '8%',
            isPositive: true,
            icon: <CalendarOutlined className='text-[#154be8]' />,
        },
        {
            title: 'Room Bookings Today',
            value: 8,
            change: '5%',
            isPositive: true,
            icon: <ApartmentOutlined className='text-[#154be8]' />,
        },
        {
            title: 'Revenue Today (Rooms)',
            value: '$1,450',
            change: '12%',
            isPositive: true,
            icon: <DollarOutlined className='text-[#119225]' />,
        },
        {
            title: 'Pending Check-ins',
            value: 5,
            change: '3%',
            isPositive: false,
            icon: <UserOutlined className='text-[#d56110]' />,
        },
    ];

    const tableColumns = [
        { title: 'Guest', dataIndex: 'guest' },
        { title: 'Table', dataIndex: 'table' },
        { title: 'Date & Time', dataIndex: 'datetime' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) =>
                <Tag color={status === 'confirmed' ? 'green' : 'red'}>{status}</Tag>,
        },
    ];

    const tableData = [
        { guest: 'John Doe', table: 'T1', datetime: '2025-01-15 19:00', status: 'confirmed' },
        { guest: 'Jane Smith', table: 'T3', datetime: '2025-01-15 20:30', status: 'confirmed' },
        { guest: 'Robert Brown', table: 'T2', datetime: '2025-01-14 18:00', status: 'cancelled' },
    ];

    const roomColumns = [
        { title: 'Guest', dataIndex: 'guest' },
        { title: 'Room', dataIndex: 'room' },
        { title: 'Check-in', dataIndex: 'checkIn' },
        { title: 'Check-out', dataIndex: 'checkOut' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) =>
                <Tag color={status === 'confirmed' ? 'green' : 'red'}>{status}</Tag>,
        },
    ];

    const roomData = [
        { guest: 'Alice Johnson', room: 101, checkIn: '2025-01-15', checkOut: '2025-01-18', status: 'confirmed' },
        { guest: 'Michael Wilson', room: 205, checkIn: '2025-01-16', checkOut: '2025-01-19', status: 'confirmed' },
    ];

    return (
        <div>
            <Row gutter={[16, 16]}>
                {statCards.map((stat, index) => (
                    <Col xs={24} sm={12} md={12} lg={12} xl={6} key={index}>
                        <StatCard {...stat} />
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} md={12}>
                    <ChartCard title="Reservations (Last 7 Days)" placeholder="Line chart will appear here" />
                </Col>
                <Col xs={24} md={12}>
                    <ChartCard title="Revenue Per Day" placeholder="Bar chart will appear here" />
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} md={12}>
                    <TableCard title="Recent Table Reservations" columns={tableColumns} data={tableData} />
                </Col>
                <Col xs={24} md={12}>
                    <TableCard title="Recent Room Bookings" columns={roomColumns} data={roomData} />
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
