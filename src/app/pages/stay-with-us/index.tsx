import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/hero-section/heroSection'
import RoomCard from '../../components/card/RoomCard';
import { FilterFieldConfig, FormDataProps } from '../../../types';
import { Filter } from '../../components';
import { roomsArray } from '../../data/data';

const StayWithUs: React.FC = () => {
    const [rooms, setRooms] = useState(roomsArray);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormDataProps>({
        checkInDate: null as Date | null,
        checkOutDate: null as Date | null,
        numberOfGuests: '',
    });


    const fields: FilterFieldConfig<FormDataProps>[] = [
        {
            id: 'checkInDate',
            name: 'checkInDate',
            label: 'Check In Date',
            type: 'date',
            required: true,
            minDate: new Date(),
        },
        {
            id: 'checkOutDate',
            name: 'checkOutDate',
            label: 'Check Out Date',
            type: 'date',
            required: true,
            minDate: formData.checkInDate ?? new Date(),
        },
        {
            id: 'numberOfGuests',
            name: 'numberOfGuests',
            label: 'Number of Guests',
            placeholder: 'Enter number of guests',
            type: 'number',
            required: true,
            min: 1,
            max: 10,
        },
    ];


    const handleReset = () => {
        setFormData({
            checkInDate: null as Date | null,
            checkOutDate: null as Date | null,
            numberOfGuests: '',
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.checkInDate && formData.checkOutDate && formData.numberOfGuests) {
            setLoading(true);
            setIsSearching(false);

            setTimeout(() => {
                setLoading(false);
                setIsSearching(true);
                setRooms(roomsArray); // Optionally filter here
            }, 5000);
        } else {
            setIsSearching(false);
            setLoading(false);
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                bgImage='/assets/images/home/hero-background.webp'
                component={
                    <Filter
                        formData={formData}
                        setFormData={setFormData}
                        handleReset={handleReset}
                        handleSubmit={handleSubmit}
                        fields={fields}
                    />
                }
            />
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primaryColor"
                        role="status"
                        aria-label="Loading"
                    />
                </div>
            )}

            {isSearching && !loading && (
                <div className="text-justify mt-10 text-base md:text-xl font-semibold uppercase px-4">
                    We have found <span className="text-teal-700">{rooms.length}</span> rooms available for your selected dates and number of guests.
                    If you need any assistance, <span className='text-primaryColor'>please contact us</span>.
                </div>
            )}

            <div className="mx-auto px-4 grid grid-cols-1 gap-10 my-10">
                {!loading && rooms.map((room, idx) => (
                    <RoomCard
                        key={idx}
                        {...room}
                        className={idx % 2 === 0 ? 'left-5' : 'right-5'}
                        state={{ bookingType: 'ROOM' }}
                    />
                ))}
            </div>
        </main>
    )
}

export default StayWithUs
