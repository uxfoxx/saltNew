import React, { useEffect } from 'react';
import { FilterFieldConfig, FormDataProps } from '../../../../types';
import { InputField } from '../../../components';
// import { IoIosArrowDown } from "react-icons/io";
import { Button, Select } from 'antd';
import RoomCardBook from './RoomCardBook';
import { roomsArray } from '../../../data/data';

const RoomBookingStepOne: React.FC<{
    fields: FilterFieldConfig<FormDataProps>[];
    setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
    formData: FormDataProps;
    handleSubmit: (e: React.FormEvent) => void;
}> = ({ fields, setFormData, formData, handleSubmit }) => {
    const [selectedRooms, setSelectedRooms] = React.useState<
        { id: string; title: string; image: string }[]
    >([]);
    const [roomCount, setRoomCount] = React.useState<number>(0);
    const [rooms, setRooms] = React.useState(roomsArray);
    const maxPerRoom = 2; // Assuming each room can accommodate 2 guests
    // const FaArrowDownIcon = IoIosArrowDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const [isAddMoreRooms, setIsAddMoreRooms] = React.useState(false);

    useEffect(() => {
        // accordint to the formData.numberOfGuests, eample if numberOfGuests is 4, and max per room is 2, then we need 2 rooms
        const numberOfGuests = formData.numberOfGuests || 0;
        const requiredRooms = Math.ceil(numberOfGuests / maxPerRoom);
        setRoomCount(requiredRooms);

        // randomly select a room from the available rooms id
        const availableRooms = rooms.filter(room => room.id === formData.roomDetails?.roomId);
        if (availableRooms.length > 0) {
            const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
            setSelectedRooms((prev) => {
                const alreadySelected = prev.find(room => room.id === randomRoom.id);
                if (!alreadySelected) {
                    return [...prev, { id: randomRoom.id, title: randomRoom.title, image: randomRoom.image }];
                }
                return prev;
            });
        } else {
            setSelectedRooms([]);
        }
        console.log("setRooms", setRooms)
    }, [formData.numberOfGuests, formData.roomDetails?.roomId, rooms]);

    return (
        <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit} className="w-full shadow-custom6 p-3 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    {fields.map((field) => {
                        const value = formData[field.name];
                        return (
                            <div className="flex flex-col w-full gap-2">
                                {field.label && <label htmlFor={field.id} className='text-black font-medium text-sm'>{field.label}</label>}
                                <InputField
                                    key={field.id}
                                    id={field.id}
                                    name={String(field.name)}
                                    type={field.type}
                                    placeholder={field.placeholder as string}
                                    value={field.type === 'date' && value instanceof Date ? value.toISOString().split('T')[0] : String(value ?? '')}
                                    onChange={(e) => {
                                        const newValue =
                                            field.type === 'number'
                                                ? Number(e.target.value)
                                                : field.type === 'date'
                                                    ? new Date(e.target.value)
                                                    : e.target.value;

                                        setFormData((prev) => ({
                                            ...prev,
                                            [field.name]: newValue || (field.required ? '' : null),
                                        }));
                                    }}
                                    className="w-full"
                                    required={field.required}
                                    min={field.min}
                                    max={field.max}
                                    minDate={field.minDate}
                                    maxDate={field.maxDate}
                                    use12Hours={field.use12Hours}
                                    format={field.format}
                                />
                            </div>
                        );
                    })}
                </div>

            </form>
            {roomCount > 0 && selectedRooms.map((room) => (
                <div className="mt-4 w-full shadow-custom6 p-3 rounded-lg">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{room.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">Total Number of Guest</p>
                            <p className="text-sm font-bold mb-2">Max {roomCount} Guests</p>
                        </div>
                        <div>
                            <div>
                                <Select
                                    value={roomCount}
                                    onChange={(value) => setRoomCount(value)}
                                >
                                    {Array.from({ length: Math.ceil((formData.numberOfGuests || 0) / maxPerRoom) }, (_, i) => (
                                        <Select.Option key={i + 1} value={i + 1}>
                                            {i + 1} Room{i + 1 > 1 ? 's' : ''}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                        </div>
                    </div>
                </div>
            ))}

            <Button
                type="default"
                onClick={() => { setIsAddMoreRooms(true) }}
                className='w-full bg-[#d7d7d7]'

            >
                <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                        fill="currentColor" />
                </svg>
                Add More Rooms
            </Button>
            {isAddMoreRooms && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2  gap-4">
                    {roomsArray.map((room) => (
                        <RoomCardBook
                            key={room.id}
                            id={room.id}
                            title={room.title}
                            image={room.image}
                            onAddRoom={(roomId) => {
                                const selected = roomsArray.find((r) => r.id === roomId);
                                if (selected) {
                                    const alreadyAdded = selectedRooms.find((r) => r.id === roomId);
                                    if (!alreadyAdded) {
                                        setSelectedRooms((prev) => [
                                            ...prev,
                                            { id: selected.id, title: selected.title, image: selected.image },
                                        ]);
                                    }
                                    setIsAddMoreRooms(false);
                                }
                            }}

                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default RoomBookingStepOne;
