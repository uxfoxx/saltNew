import React, { useState } from 'react';
import { Card, Select, DatePicker, Row, Col, Statistic, Button } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface RevenueData {
    period: string;
    roomRevenue: number;
    tableRevenue: number;
    totalRevenue: number;
    bookings: number;
    reservations: number;
}

const Reports: React.FC = () => {
    const [reportType, setReportType] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

    // Sample revenue data
    const monthlyData: RevenueData[] = [
        { period: 'January 2025', roomRevenue: 45000, tableRevenue: 18000, totalRevenue: 63000, bookings: 85, reservations: 120 },
        { period: 'December 2024', roomRevenue: 52000, tableRevenue: 22000, totalRevenue: 74000, bookings: 95, reservations: 140 },
        { period: 'November 2024', roomRevenue: 38000, tableRevenue: 15000, totalRevenue: 53000, bookings: 70, reservations: 95 },
        { period: 'October 2024', roomRevenue: 41000, tableRevenue: 17000, totalRevenue: 58000, bookings: 78, reservations: 110 },
    ];

    const weeklyData: RevenueData[] = [
        { period: 'Week 3 Jan 2025', roomRevenue: 12000, tableRevenue: 4500, totalRevenue: 16500, bookings: 22, reservations: 35 },
        { period: 'Week 2 Jan 2025', roomRevenue: 11500, tableRevenue: 4200, totalRevenue: 15700, bookings: 20, reservations: 32 },
        { period: 'Week 1 Jan 2025', roomRevenue: 13200, tableRevenue: 5100, totalRevenue: 18300, bookings: 25, reservations: 38 },
        { period: 'Week 4 Dec 2024', roomRevenue: 14800, tableRevenue: 5800, totalRevenue: 20600, bookings: 28, reservations: 42 },
    ];

    const getCurrentData = () => {
        return reportType === 'weekly' ? weeklyData : monthlyData;
    };

    const currentData = getCurrentData();
    const latestPeriod = currentData[0];

    const handleExportReport = () => {
        // In a real app, this would generate and download a PDF/Excel report
        console.log('Exporting report for:', reportType, dateRange);
        alert('Report export functionality would be implemented here');
    };

    return (
        <div className="space-y-6">
            {/* Header with Controls */}
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Revenue Reports & Analytics</h2>
                        <p className="text-gray-600">Track your business performance with detailed revenue insights</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Select
                            value={reportType}
                            onChange={setReportType}
                            style={{ width: 120 }}
                        >
                            <Option value="weekly">Weekly</Option>
                            <Option value="monthly">Monthly</Option>
                            <Option value="custom">Custom</Option>
                        </Select>
                        {reportType === 'custom' && (
                            <RangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                format="YYYY-MM-DD"
                            />
                        )}
                        <Button 
                            type="primary" 
                            icon={<DownloadOutlined />}
                            onClick={handleExportReport}
                        >
                            Export Report
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Key Metrics */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={latestPeriod.totalRevenue}
                            prefix="LKR"
                            valueStyle={{ color: '#3f8600' }}
                            suffix={
                                <div className="text-xs text-gray-500 mt-1">
                                    {latestPeriod.period}
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Room Revenue"
                            value={latestPeriod.roomRevenue}
                            prefix="LKR"
                            valueStyle={{ color: '#1890ff' }}
                            suffix={
                                <div className="text-xs text-gray-500 mt-1">
                                    {((latestPeriod.roomRevenue / latestPeriod.totalRevenue) * 100).toFixed(1)}% of total
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Table Revenue"
                            value={latestPeriod.tableRevenue}
                            prefix="LKR"
                            valueStyle={{ color: '#722ed1' }}
                            suffix={
                                <div className="text-xs text-gray-500 mt-1">
                                    {((latestPeriod.tableRevenue / latestPeriod.totalRevenue) * 100).toFixed(1)}% of total
                                </div>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Bookings"
                            value={latestPeriod.bookings + latestPeriod.reservations}
                            valueStyle={{ color: '#fa8c16' }}
                            suffix={
                                <div className="text-xs text-gray-500 mt-1">
                                    {latestPeriod.bookings} rooms, {latestPeriod.reservations} tables
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card 
                        title="Revenue Trend" 
                        extra={<LineChartOutlined />}
                        className="h-80"
                    >
                        <div className="h-60 flex items-center justify-center bg-gray-50 rounded">
                            <div className="text-center">
                                <LineChartOutlined className="text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-500">Revenue trend chart would be displayed here</p>
                                <div className="mt-4 space-y-2">
                                    {currentData.slice(0, 3).map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span>{item.period}</span>
                                            <span className="font-medium">LKR {item.totalRevenue.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card 
                        title="Revenue Breakdown" 
                        extra={<PieChartOutlined />}
                        className="h-80"
                    >
                        <div className="h-60 flex items-center justify-center bg-gray-50 rounded">
                            <div className="text-center">
                                <PieChartOutlined className="text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-500">Revenue breakdown pie chart would be displayed here</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center">
                                            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                                            Rooms
                                        </span>
                                        <span className="font-medium">
                                            {((latestPeriod.roomRevenue / latestPeriod.totalRevenue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center">
                                            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                                            Tables
                                        </span>
                                        <span className="font-medium">
                                            {((latestPeriod.tableRevenue / latestPeriod.totalRevenue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Detailed Data Table */}
            <Card title="Detailed Revenue Data" extra={<BarChartOutlined />}>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 font-semibold">Period</th>
                                <th className="text-right p-3 font-semibold">Room Revenue</th>
                                <th className="text-right p-3 font-semibold">Table Revenue</th>
                                <th className="text-right p-3 font-semibold">Total Revenue</th>
                                <th className="text-right p-3 font-semibold">Room Bookings</th>
                                <th className="text-right p-3 font-semibold">Table Reservations</th>
                                <th className="text-right p-3 font-semibold">Avg. Revenue/Booking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{item.period}</td>
                                    <td className="p-3 text-right">LKR {item.roomRevenue.toLocaleString()}</td>
                                    <td className="p-3 text-right">LKR {item.tableRevenue.toLocaleString()}</td>
                                    <td className="p-3 text-right font-semibold">LKR {item.totalRevenue.toLocaleString()}</td>
                                    <td className="p-3 text-right">{item.bookings}</td>
                                    <td className="p-3 text-right">{item.reservations}</td>
                                    <td className="p-3 text-right">
                                        LKR {Math.round(item.totalRevenue / (item.bookings + item.reservations)).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Reports;