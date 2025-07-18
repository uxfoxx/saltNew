import {
    DashboardOutlined,
    CoffeeOutlined,
    BookOutlined,
    HomeOutlined,
    TableOutlined,
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export interface AdminNavigationItem {
    title: string;
    icon: JSX.Element;
    path: string;
    subtitle?: string;
    role: string[] | 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT' | 'GUEST';
    isSlider: boolean;
}

const adminNavigationConfig: AdminNavigationItem[] = [
    {
        title: 'Dashboard',
        subtitle: 'Manage Dashboard',
        icon: <DashboardOutlined />,
        path: '/admin/dashboard',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Room Bookings',
        subtitle: 'View Room Bookings',
        icon: <BookOutlined />,
        path: '/admin/room-bookings',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Rooms Management',
        subtitle: 'Edit and Add Rooms',
        icon: <HomeOutlined />,
        path: '/admin/rooms-management',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Table Reservations',
        subtitle: 'Manage Table Bookings',
        icon: <CoffeeOutlined />,
        path: '/admin/table-reservations',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Table Management',
        subtitle: 'Edit and Add Tables',
        icon: <TableOutlined />,
        path: '/admin/table-management',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Guests',
        subtitle: 'Manage Guest Profiles',
        icon: <UserOutlined />,
        path: '/admin/guests',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Admin Users',
        subtitle: 'Manage Admin Accounts',
        icon: <TeamOutlined />,
        path: '/admin/admin-users',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: true,
    },
    {
        title: 'Settings',
        subtitle: 'System Settings',
        icon: <SettingOutlined />,
        path: '/admin/settings',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: false,
    },
    {
        title: 'Room Overview',
        subtitle: 'View Room Details',
        icon: <HomeOutlined />,
        path: '/admin/rooms-management/:id',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: false
    },
    {
        title: 'Table Overview',
        subtitle: 'View Table Details',
        icon: <TableOutlined />,
        path: '/admin/table-management/:id',
        role: ['SUPER_ADMIN', 'MANAGER', 'STAFF', 'CLIENT', 'GUEST'],
        isSlider: false
    }
];

export default adminNavigationConfig;
