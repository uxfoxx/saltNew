import React, { useEffect } from 'react'
import { SwiperComponent } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom';
import { roomsArray } from '../../data/data';
import { RoomIf } from '../../../types';
const RoomView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // get id from url params pop
    const roomId = location.pathname.split('/').pop() || '';
    const [room, setRoom] = React.useState<RoomIf>({} as RoomIf);

    useEffect(() => {
        // Find the room details based on roomId
        const foundRoom = roomsArray.find(room => room.id === roomId);
        if (foundRoom) {
            setRoom(foundRoom);
        } else {
            navigate('/'); // Redirect to 404 if room not found
        }
    }, [roomId, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!room || !room.moreDetails) {
        return <div className="text-center py-10">Loading...</div>; // Show loading state
    }

    return (
        <main className="pt-[76px]">
            {/* Heading & Book Button */}
            <section className="text-center pt-10 px-4 flex flex-col items-center justify-center ">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{room?.moreDetails.title}</h1>
            </section>

            {/* Swiper Gallery */}
            <div className='px-4'>
                <SwiperComponent
                    containerClass='min-h-[50vh]'
                    images={room?.moreDetails.images || []}
                    breakpoints={{
                        768: { slidesPerView: 2, spaceBetween: 10 },
                        1024: { slidesPerView: 3, spaceBetween: 15 },
                    }}
                    slideWidth="w-full"
                    slideHeight="h-80"
                />
            </div>

            {/* Overview + Facilities */}
            <section className="grid md:grid-cols-2 gap-8 mx-auto px-4 pb-16">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Overview</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {room?.moreDetails.description}
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
                        {room?.moreDetails.overview.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                    <p className="text-gray-600 text-sm leading-relaxed mt-4">
                        {room?.moreDetails.overview.notes}
                    </p>
                </div>

                {/* Facilities */}
                <div className='flex flex-col gap-4 justify-between w-full'>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Top Facilities at Salt Mirissa</h2>
                        <ul className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
                            {room?.moreDetails.facilities.map((facility, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <img src={facility.icon} alt={facility.label} className="w-4 h-4 inline-block" />
                                    {facility.label}
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div className='w-full'>
                        {room.price && (
                            <div className="text-lg font-semibold mb-2">
                                <span className="text-teal-700">{room.price}</span>
                            </div>
                        )}
                        <button
                            type='button'
                            onClick={() => navigate(`/room-book/${roomId}`, { state: { bookingType: 'ROOM' } })}
                            className="w-full flex items-center gap-2  justify-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-5 py-2 rounded"
                        >
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                    fill="currentColor" />
                            </svg>
                            Book Now
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default RoomView
