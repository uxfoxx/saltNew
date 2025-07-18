import React, { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const bookings = [
    {
        room: 'DELUXE DOUBLE SHARING ROOM',
        checkInDate: 'Thu 1 May 2025',
        checkInTime: '14:30 – 18:00',
        checkOutDate: 'Fri 2 May 2025',
        checkOutTime: '11:00 – 12:00',
        status: 'Pending',
        notes: 'This is a deluxe room facing the beach. Includes breakfast and WiFi.',
    },
    {
        room: 'DELUXE DOUBLE SHARING ROOM',
        checkInDate: 'Thu 1 May 2025',
        checkInTime: '14:30 – 18:00',
        checkOutDate: 'Fri 2 May 2025',
        checkOutTime: '11:00 – 12:00',
        status: 'Closed',
        notes: 'This booking was completed and checked out successfully.',
    },
];

const HistoryTab: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="space-y-4">
            {bookings.map((b, i) => {
                const isExpanded = expandedIndex === i;

                return (
                    <div
                        key={i}
                        className="border rounded-xl p-4 bg-white flex flex-col gap-4"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Room Info */}
                            <div className="flex-1">
                                <p className="font-bold text-lg">{b.room}</p>
                                <div className="flex gap-8 mt-1">
                                    <div>
                                        <p className="text-sm text-gray-700 font-semibold">Check-in</p>
                                        <p className="text-sm text-gray-900 font-bold">{b.checkInDate}</p>
                                        <p className="text-sm text-gray-500">{b.checkInTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700 font-semibold">Check-out</p>
                                        <p className="text-sm text-gray-900 font-bold">{b.checkOutDate}</p>
                                        <p className="text-sm text-gray-500">{b.checkOutTime}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status + Buttons */}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5">
                                <span
                                    className={`text-sm font-semibold ${b.status === 'Pending' ? 'text-teal-600' : 'text-gray-400'
                                        }`}
                                >
                                    {b.status}
                                </span>
                                <Button
                                    className="bg-primaryColor text-sm text-white py-2 px-4 flex items-center gap-2 rounded shadow"
                                    type="primary"
                                    icon={
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor">
                                            <path d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z" />
                                        </svg>
                                    }
                                >
                                    Contact Us
                                </Button>

                                <button
                                    onClick={() => toggleExpand(i)}
                                    className="flex items-center rounded-full gap-2 bg-teal-600 text-white font-medium text-sm p-2 shadow hover:bg-teal-700 transition transform"
                                    aria-label="Toggle More"
                                >
                                    <ArrowRightOutlined
                                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        {isExpanded && (
                            <div className="mt-2 border-t pt-3 text-sm text-gray-600">
                                <p><strong>Notes:</strong> {b.notes}</p>
                                {/* You can also include guests, room type, services, etc. */}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default HistoryTab;
