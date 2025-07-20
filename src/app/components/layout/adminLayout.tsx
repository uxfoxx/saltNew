import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Dropdown, Space, Badge } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import adminNavigationConfig from '../../routes/adminNavigationConfig';
import './adminLayout.css';
import { useAppContext } from '../../../contexts/AppContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const { me } = useAppContext();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const { token: { colorBgContainer } } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();


    const mapRoleFromEnv = (roleNumber: number | undefined | null): string => {
        if (!roleNumber) return 'GUEST';

        const ROLE_MAP: Record<number, string> = {
            [Number(process.env.REACT_APP_SUPER_ADMIN)]: 'SUPER_ADMIN',
            [Number(process.env.REACT_APP_MANAGER)]: 'MANAGER',
            [Number(process.env.REACT_APP_STAFF)]: 'STAFF',
            [Number(process.env.REACT_APP_CLIENT)]: 'CLIENT',
        };

        return ROLE_MAP[roleNumber] || 'GUEST';
    };

    // For bypass mode, default to SUPER_ADMIN if no user is logged in
    const userType = me?.role ? mapRoleFromEnv(me?.role) : 'SUPER_ADMIN';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="bg-[#1f3a8a]"
                width={230}
                style={{
                    height: '100vh',
                    maxHeight: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: isMobile ? 999 : 1,
                }}
            >
                <div className="flex flex-col h-full justify-between">
                    <div className='px-3 py-4'>
                        <div className="text-white font-bold text-lg text-center mb-4 relative">
                            SALT
                            {collapsed ? null :
                                isMobile &&
                                <Button
                                    type="primary"
                                    icon={<MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                    }}
                                    className='absolute top-0 right-0 mr-2 text-white'
                                />
                            }
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            className="custom-admin-menu bg-[#1f3a8a]"
                            selectedKeys={[location.pathname]}
                            items={adminNavigationConfig
                                .filter((item) => item.isSlider && (!item.role || item.role.includes(userType)))
                                .map((item) => ({
                                    key: item.path,
                                    icon: item.icon,
                                    label: item.title,
                                    onClick: () => {
                                        navigate(item.path)
                                        if (isMobile) {
                                            setCollapsed(true);
                                        }
                                    },
                                }))}
                        />
                    </div>
                    <div className="w-full border-t-[1px] border-white  pt-3 pb-4">
                        {/* // Menu log out */}
                        <Menu
                            theme="dark"
                            mode="inline"
                            className="custom-admin-menu bg-[#1f3a8a]"
                            items={[
                                {
                                    key: 'logout',
                                    icon: <LogoutOutlined />,
                                    label: 'Logout',
                                    onClick: () => {
                                        localStorage.clear();
                                        navigate('/sign-in');
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </Sider>

            <Layout style={{
                marginLeft: collapsed ? 80 : isMobile ? 80 : 230,
                transition: 'margin-left 0.2s'
            }}>
                <Header
                    style={{
                        padding: '0 16px',
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                        }}
                    />

                    <div className="flex items-center gap-6">
                        {/* Notification Icon with badge */}
                        <Badge count={2} size="small" offset={[-3, 3]}>
                            <BellOutlined style={{ fontSize: 18 }} />
                        </Badge>

                        {/* Profile Dropdown */}

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'profile',
                                        icon: <UserOutlined />,
                                        label: 'Profile',
                                    },
                                    {
                                        type: 'divider',
                                    },
                                    {
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                        label: 'Logout',
                                        onClick: () => {
                                            localStorage.clear();
                                            navigate('/sign-in');
                                        },
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >

                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar size="small" icon={<UserOutlined />} />
                                <span className="font-medium">Admin User</span>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: '16px 16px',
                        minHeight: 280,
                        background: '#f9fafb'
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
