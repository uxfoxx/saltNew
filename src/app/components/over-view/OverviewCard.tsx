import React, { useState } from 'react';
import { ArrowLeft, BarChart3, CalendarIcon, ChevronDown, Clock, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../card/StatusBadge';
import { OverviewData, Room } from '../../../types';
import Calendar from '../calendar';

const OverviewCard: React.FC<{ data: OverviewData }> = ({ data }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'calendar'>('overview');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getNextAppointment = () => {
        const now = new Date('2025-01-14T00:00:00'); // Use a fixed date for testing need to change this to current date
        const upcomingBookings = data.bookings
            .filter(booking => new Date(booking.startDate) > now)
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        return upcomingBookings[0];
    };

    const getCurrentGuest = () => {
        const now = new Date('2025-01-20'); // Use a fixed date for testing need to change this to current date
        console.log("data.bookings", data.bookings);
        return data.bookings.find(booking => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            return now >= start && now <= end && booking.status === 'checked-in';
        });
    };

    const nextAppointment = getNextAppointment();
    const currentGuest = getCurrentGuest();
    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'calendar', label: 'Calendar', icon: CalendarIcon }
    ];

    const statusOptions: { value: Room['status']; label: string; description: string }[] = [
        { value: 'available', label: 'Available', description: 'Ready for new bookings' },
        { value: 'occupied', label: 'Occupied', description: 'Currently has a guest' },
        { value: 'maintenance', label: 'Maintenance', description: 'Under maintenance' },
        { value: 'cleaning', label: 'Cleaning', description: 'Being cleaned' },
        { value: 'ready', label: 'Ready', description: 'Clean and ready for guest' }
    ];

    const handleStatusChange = (status: Room['status']) => {
        setIsStatusDropdownOpen(false);
    };
    return (
        <div className=" space-y-6 bg-[#f9fafb] min-h-screen -mt-4">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pt-16 lg:pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{data.title}</h1>
                            <p className="text-gray-600 mt-1">{data.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <StatusBadge status={data.status} />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-8">
                    <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as 'overview' | 'calendar')}
                                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Status Management */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                                Status Management
                            </h2>
                            <div className="relative">
                                <button
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <StatusBadge status={data.status} />
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isStatusDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                        {statusOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleStatusChange(option.value)}
                                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${data.status === option.value ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <StatusBadge status={option.value} />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="xl:col-span-3 space-y-6 lg:space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Current Status</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{data.bookings.length}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Revenue/Night</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">${data.pricePerNight}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Current Status & Next Appointment */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <User className="h-5 w-5 mr-2 text-gray-600" />
                                    Current Occupancy
                                </h2>
                                {currentGuest ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-900 font-semibold truncate">{currentGuest.guestName}</p>
                                                <p className="text-sm text-gray-500">Currently checked in</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                                                <span className="text-gray-600">Check-in:</span>
                                                <span className="font-medium">{formatDateTime(new Date(currentGuest.startDate))}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                                                <span className="text-gray-600">Check-out:</span>
                                                <span className="font-medium">{formatDateTime(new Date(currentGuest.endDate))}</span>
                                            </div>
                                            {currentGuest.phone && (
                                                <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                                                    <span className="text-gray-600">Phone:</span>
                                                    <span className="font-medium">{currentGuest.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Room is currently unoccupied</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-gray-600" />
                                    Next Appointment
                                </h2>
                                {nextAppointment ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-900 font-semibold truncate">{nextAppointment.guestName}</p>
                                                <p className="text-sm text-gray-500">
                                                    {formatDateTime(new Date(nextAppointment.startDate))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                                                <span className="text-gray-600">Duration:</span>
                                                <span className="font-medium">
                                                    {Math.ceil((new Date(nextAppointment.endDate).getTime() - new Date(nextAppointment.startDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                                                </span>
                                            </div>
                                            {nextAppointment.phone && (
                                                <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                                                    <span className="text-gray-600">Phone:</span>
                                                    <span className="font-medium">{nextAppointment.phone}</span>
                                                </div>
                                            )}
                                            <div className="pt-2">
                                                <StatusBadge status={nextAppointment.status} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">No upcoming appointments</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Maintenance Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-gray-600" />
                                Maintenance Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {data.lastCleaned && (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="text-sm font-medium text-gray-500">Last Cleaned</label>
                                            <p className="text-gray-900 font-medium truncate">{formatDateTime(new Date(data.lastCleaned))}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-sm font-medium text-gray-500">Total Bookings</label>
                                        <p className="text-gray-900 font-medium">{data.bookings.length} bookings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'calendar' && (
                <div className="w-full">
                    <Calendar bookings={data.bookings} type={data.type} />
                </div>
            )}
            {/* Grid */}
            {/* <div className="grid md:grid-cols-3 gap-4">
                Status Management
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="font-medium mb-2">⚙️ Status Management</p>
                    <Select defaultValue={data.status} className="w-full">
                        {data.statusOptions.map((opt) => (
                            <Option key={opt} value={opt}>
                                {opt}
                            </Option>
                        ))}
                    </Select>
                </div>

                Current Status
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Current Status</p>
                        <SettingOutlined className="text-blue-500" />
                    </div>
                    <p className="text-xl font-semibold">{data.status}</p>
                </div>

                Total Bookings
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <LineChartOutlined className="text-green-500" />
                    </div>
                    <p className="text-xl font-semibold">{data.totalBookings}</p>
                </div>

                Revenue
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Revenue/Night</p>
                        <CalendarOutlined className="text-purple-500" />
                    </div>
                    <p className="text-xl font-semibold">{data.revenue}</p>
                </div>

                Current Occupancy
                <div className="bg-white rounded-lg shadow p-4 col-span-2">
                    <p className="font-medium mb-2">👤 Current Occupancy</p>
                    <div className="flex flex-col items-center justify-center h-28 text-sm text-gray-400">
                        <div className="text-3xl">👤</div>
                        {data.occupancyText}
                    </div>
                </div>

                Next Appointment
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="font-medium mb-2">⏰ Next Appointment</p>
                    <div className="flex flex-col items-center justify-center h-20 text-sm text-gray-400">
                        <div className="text-xl">🕒</div>
                        {data.appointmentText}
                    </div>
                </div>

                Maintenance Info
                <div className="bg-white rounded-lg shadow p-4 col-span-3">
                    <p className="font-medium mb-2">🧹 Maintenance Information</p>
                    <div className="flex justify-between items-center text-sm text-gray-700">
                        <div>
                            <p>
                                <strong className="text-yellow-600">Last Cleaned</strong>
                            </p>
                            <p>{data.lastCleaned}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">📈 Total Bookings</p>
                            <p className="text-blue-500 font-medium">{data.currentBookings} bookings</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default OverviewCard;
