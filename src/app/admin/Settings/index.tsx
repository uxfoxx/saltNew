// import React from 'react';
// import { Tabs } from 'antd';
// import Guests from '../Guests';
// import AdminUsers from '../AdminUsers';
// import TableManagement from '../TableManagement';
// import RoomsManagement from '../RoomsManagement';
// import TableReservations from '../TableReservations';
// import RoomBookings from '../RoomBookings';

// const { TabPane } = Tabs;

// const Settings: React.FC = () => {
//     return (
//         <div className="p-4 bg-white rounded-lg shadow-custom6">
//             <h1 className="text-xl font-semibold mb-4">System Settings</h1>
//             <Tabs defaultActiveKey="guests" type="card">
//                 <TabPane tab="Guests" key="guests">
//                     <Guests />
//                 </TabPane>
//                 <TabPane tab="Admin Users" key="admins">
//                     <AdminUsers />
//                 </TabPane>
//                 <TabPane tab="Table Management" key="tables">
//                     <TableManagement />
//                 </TabPane>
//                 <TabPane tab="Room Management" key="rooms">
//                     <RoomsManagement />
//                 </TabPane>
//                 <TabPane tab="Table Reservations" key="reservations">
//                     <TableReservations />
//                 </TabPane>
//                 <TabPane tab="Room Bookings" key="bookings">
//                     <RoomBookings />
//                 </TabPane>
//             </Tabs>
//         </div>
//     );
// };

// export default Settings;
import React from 'react';
import { Card, List, Typography } from 'antd';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
    const settingItems = [
        {
            title: 'Guests',
            description: 'Manage guest status, view profiles, and activity history.',
        },
        {
            title: 'Admin Users',
            description: 'Control admin accounts, roles, and access privileges.',
        },
        {
            title: 'Table Management',
            description: 'Configure table numbers, seating capacity, and availability.',
        },
        {
            title: 'Rooms Management',
            description: 'Set up room types, pricing, and status (available/occupied).',
        },
        {
            title: 'Room Bookings',
            description: 'Review booking logs and manage room availability.',
        },
        {
            title: 'Table Reservations',
            description: 'Handle customer reservations and table schedules.',
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-custom6">
            <Title level={3}>System Settings Overview</Title>
            <Text type="secondary">Below are the modules currently active in your system.</Text>

            <List
                itemLayout="vertical"
                dataSource={settingItems}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title} bordered={false}>
                            <Text>{item.description}</Text>
                        </Card>
                    </List.Item>
                )}
                className="mt-4"
            />
        </div>
    );
};

export default Settings;
