import React from 'react';
import { Modal, Button } from 'antd';

interface ReservationModalProps {
    visible: boolean;
    onCancel: () => void;
    onDownload: () => void;
    data: {
        roomName: string;
        checkInDate: string;
        time: string;
        guests: number;
        tables: number;
    };
}

const ReservationCompletedModal: React.FC<ReservationModalProps> = ({
    visible,
    onCancel,
    onDownload,
    data
}) => {
    return (
        <Modal
            title={<span className="font-medium text-base">Reservation Completed</span>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
            className="custom-reservation-modal"
        >
            <div className="text-left space-y-6">
                {/* Room Title */}
                <div>
                    <h2 className="text-xl font-semibold">{data.roomName}</h2>
                </div>

                {/* Date Section */}
                <div>
                    <p className="text-sm font-medium text-gray-600">Check-in</p>
                    <p className="text-2xl font-bold">{data.checkInDate}</p>
                    <p className="text-sm text-gray-600">{data.time}</p>
                </div>

                {/* Guest/Table Info */}
                <div className="flex justify-between border-b pb-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Number of guests</p>
                        <p className="font-semibold text-black">{data.guests} guests</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Number of tables</p>
                        <p className="font-semibold text-black">{data.tables} tables</p>
                    </div>
                </div>

                {/* Note */}
                <div className="bg-transparent text-[#3b7576] text-[16px] font-semibold leading-relaxed">
                    Note: Reservations for 14 or more guests will require a set menu. Ordering from the menu
                    will not be available for large group bookings.
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-3 pt-2">
                    <Button
                        onClick={onCancel}
                        className="w-full bg-[#f2f2f2] text-black font-medium border-none"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onDownload}
                        className="w-full bg-[#3b7576] text-white font-medium border-none"
                    >
                        Download Recipe
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReservationCompletedModal;
