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
        rooms: number;
    };
}

const ReservationCompletedModal: React.FC<ReservationModalProps> = ({
    visible,
    onCancel,
    onDownload,
    data,
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
            <div className="text-left space-y-5 text-sm">
                {/* Room Title */}
                <div>
                    <h2 className="text-base font-semibold">{data.roomName}</h2>
                </div>

                {/* Check-in / Check-out */}
                <div className="flex justify-between text-sm font-medium">
                    <div>
                        <p className="text-gray-500">Check-in</p>
                        <p className="text-xl font-bold">{data.checkInDate}</p>
                        <p className="text-gray-600">{data.time}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Check-out</p>
                        <p className="text-xl font-bold">Fri 2 May 2025</p>
                        <p className="text-gray-600">11:00 – 12:00</p>
                    </div>
                </div>

                {/* Guest Count */}
                <div>
                    <p className="text-sm text-gray-500">Total Number of guests</p>
                    <p className="text-sm font-medium">{data.guests} guests</p>
                </div>

                {/* Charges */}
                <div className="border-y py-3 text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Room</span>
                        <span>LKR 31,989.06</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Bead And Breakfast</span>
                        <span>LKR 31,989.06</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-base font-semibold">Total</p>
                        <p className="text-xs text-gray-500">Includes taxes and charges</p>
                    </div>
                    <div className="text-[#3b7576] text-lg font-bold">LKR 31,989.06</div>
                </div>

                {/* Footer Buttons */}
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
                        Download Receipt
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReservationCompletedModal;
