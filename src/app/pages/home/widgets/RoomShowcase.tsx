import { Link, useNavigate } from "react-router-dom";
import { roomsArray } from "../../../data/data";

interface RoomCardProps {
    image: string;
    price: string;
    title: string;
    id: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ image, price, title, id }) => (
    <Link
        to={`/room-view/${id}`}
        className="rounded-lg overflow-hidden shadow-lg w-full h-[460px] relative group hover:scale-105 transition-transform duration-300 ease-in-out"
    >
        <img src={image} alt={title} className="object-cover w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/50 p-4 text-white flex flex-col justify-end transition-opacity duration-300 ease-in-out uppercase">
            <p className="text-sm mt-2">{price}</p>
            <h3 className="text-lg font-bold">{title}</h3>
        </div>
    </Link>
);

const RoomShowcase: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 px-4 mx-auto flex flex-col gap-8 items-center justify-center">
            <h2 className="text-2xl font-bold uppercase">Explore Our Luxury Accommodation</h2>
            <p className="text-sm text-left md:text-center">Salt Resort & Restaurant is your private haven by the sea. Each accommodation is thoughtfully designed to blend seamlessly with the natural landscape, while offering modern comforts. Whether it’s a morning coffee on the balcony, or a sunset nap by the beach, every stay promises peace, luxury, and unforgettable memories.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {roomsArray.map((room, idx) => <RoomCard key={idx} {...room} />)}
            </div>
            <div className="w-full text-right mt-4">
                <button
                    className="text-sm bg-black/10 rounded-md px-2 py-1 hover:bg-black/20 transition duration-300 ease-in-out"
                    onClick={() => navigate("/stay-with-us")}
                >
                    View all rooms
                </button>
            </div>
        </section>
    );
};

export default RoomShowcase;
