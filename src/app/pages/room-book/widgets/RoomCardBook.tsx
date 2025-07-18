// components/RoomCard.tsx
import React from 'react';
import { Button } from 'antd';

interface RoomCardProps {
    id: string;
    title: string;
    image: string;
    maxGuests?: number;
    onAddRoom?: (id: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
    id,
    title,
    image,
    maxGuests = 2,
    onAddRoom,
}) => {
    return (
        <div className="border rounded-lg shadow-sm overflow-hidden p-4">
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover"
            />
            <div className='mt-2'>
                <h4 className="text-base font-semibold">{title}</h4>
                <p className="text-xs text-gray-500">Total Number of Guests</p>
                <p className="text-xs font-semibold">Max {maxGuests} Guests</p>
                {onAddRoom && (
                    <Button
                        type="default"
                        className="mt-3 w-full bg-[#d7d7d7] flex items-center justify-center gap-2"
                        onClick={() => onAddRoom(id)}
                    >
                        <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z" />
                        </svg>
                        Add Room
                    </Button>
                )}
            </div>
        </div>
    );
};

export default RoomCard;
