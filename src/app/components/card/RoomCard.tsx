import { useNavigate } from "react-router-dom";

interface RoomCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    price?: string;
    amenities: string[];
    className?: string;
    redirectionURL?: string;
    bookNowURL?: string;
    state?: any;
}

const RoomCard: React.FC<RoomCardProps> = ({ id, image, title, description, price, amenities, className = 'right-5', redirectionURL, bookNowURL, state }) => {
    const navigate = useNavigate();
    return (
        <div className="pb-20 rounded-lg">
            <div className="w-full rounded-lg shadow-md relative">
                <div className="w-full min-h-[400px] max-h-[400px] h-[400px] rounded-lg overflow-hidden">
                    <img src={image} alt={title} className="object-cover h-full w-full rounded-lg" />
                </div>

                <div className={`bg-white p-6 flex flex-col justify-between absolute -bottom-20 shadow-2xl rounded-lg max-w-[360px] md:max-w-[560px] ${className}`}>
                    <div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-2 uppercase">{title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{description}</p>
                        <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                            {amenities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {price && <span className="mt-6 text-sm font-semibold text-teal-700">{price}</span>}
                    <div className="mt-6 flex justify-between items-center">
                        <div
                            className="text-sm text-black flex items-center gap-2 cursor-pointer"
                            onClick={() => navigate(redirectionURL || `/room-view/${id}`, { state })}
                        >
                            View More details
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(bookNowURL || `/room-book/${id}`, { state })}
                            className="bg-white shadow-md text-sm text-primaryColor rounded-lg flex items-center gap-2 py-1 px-2"
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
            </div>
        </div>
    );
};

export default RoomCard;
