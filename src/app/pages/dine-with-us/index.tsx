import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/hero-section/heroSection'
import RoomCard from '../../components/card/RoomCard';
import { FilterFieldConfig, ReservationFormData } from '../../../types';
import { Filter } from '../../components';

export const tablesArray = [
    {
        id: 'af4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
        image: "/assets/images/dine-with-us/beach front dining.webp",
        title: "Beachfront Dining",
        description: `Dine with your feet in the sand and the sound of the ocean just steps away. Our beachfront dining area is perfect for romantic dinners, sunset cocktails, or relaxed seaside lunches with a view that never disappoints.`,
        amenities: ["Open-air seating by the waves", "Ideal for sunset views and fresh seafood", "Relaxed coastal ambiance"],
        viewMore: `
        Beachfront dining at Salt Mirissa brings together the best of the island lifestyle. Set just steps from the sea, this area offers uninterrupted views of the ocean, with seating arranged to take full advantage of the coastal setting.
        <br />
        <br />
        It is the ideal space for leisurely lunches, romantic sunset dinners, or sipping cocktails under the stars. The sound of waves and the salty breeze add to the sensory experience, while our menu features everything from locally caught seafood to international favorites.
        <br />
        <br />
        Our beachfront area can accommodate both couples and small groups, with options for candlelit setups and personalized arrangements. Whether it’s a casual bite or a special celebration, this is where coastal living comes to life on your plate.
        `
    },
    {
        id: 'bd4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
        image: "/assets/images/dine-with-us/indoor dining.webp",
        title: "In - Door Dinning",
        description: `Located on the ground floor, our indoor dining area blends elegant design with cozy comfort. Enjoy your meal surrounded by warm lighting and lush greenery, rain or shine.`,
        amenities: ["Elegant indoor setting", "Perfect for day and night dining", "Calm atmosphere with air circulation"],
        viewMore: `
        Salt Mirissa’s indoor dining space offers a refined yet relaxed alternative to our outdoor seating. Located on the ground floor, it is designed for comfort, combining earthy tones, soft lighting, and a connection to nature through large windows and surrounding greenery.
        <br />
        <br />
        This space is ideal for breakfast, lunch, or dinner, especially when guests seek a quiet and temperature-neutral environment. The seating is spacious and well-placed to ensure privacy and calm, even during busier dining hours.
        <br />
        <br />
        Whether you’re escaping the midday sun or looking for a cozy place to dine at night, our indoor space provides a versatile and welcoming setting. The same high-quality service and full menu are available, making this an equally delightful dining choice.
        `
    },
    {
        id: 'jhd4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
        image: "/assets/images/dine-with-us/lounge.webp",
        title: "Lounge",
        description: `Step upstairs to our air-conditioned lounge, a chic and relaxed space with breathtaking infinite view of the sea designed for those who enjoy a cooler dining experience. Great for quiet meals, group gatherings, or a private corner with a view.`,
        amenities: ["Fully air-conditioned for comfort", "Modern, stylish seating", "Ideal for lunch meetings or evening cocktails"],
        viewMore: `
        Step upstairs to our air-conditioned lounge, a chic and relaxed space thoughtfully designed for guests who prefer a cooler and more refined dining atmosphere. This upper-floor area offers a peaceful escape from the outdoor heat while still capturing the essence of coastal living.
        <br />
        <br />
        What truly sets the lounge apart is the breathtaking infinite view of the sea. From this elevated position, guests can enjoy uninterrupted ocean scenery stretching across the horizon — a perfect backdrop for a quiet meal or a relaxing drink.
        <br />
        <br />
        The lounge features modern, stylish seating with soft lighting and curated decor, creating an ideal setting for lunch meetings, small group gatherings, or intimate evening cocktails. It’s a favorite among those seeking a balance between comfort, privacy, and visual beauty.
        <br />
        <br />
        Enjoy the full Salt Mirissa menu in a space where air-conditioned comfort meets stunning natural views, making every visit a refreshing and memorable experience.
        `
    },


]

const DineWithUs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [tables, setTables] = useState(tablesArray);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<ReservationFormData>({
        reservationDate: null as Date | null,
        reservationTime: '',
        numberOfGuests: "",
    });


    const fields: FilterFieldConfig<ReservationFormData>[] = [
        {
            id: 'reservationDate',
            name: 'reservationDate',
            label: 'Reservation Date',
            type: 'date',
            required: true,
            minDate: new Date(),
        },
        {
            id: 'reservationTime',
            name: 'reservationTime',
            label: 'Reservation Time',
            type: 'time',
            required: true,
            use12Hours: true,
            format: 'HH:mm',
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
            reservationDate: null as Date | null,
            reservationTime: '',
            numberOfGuests: '',
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.reservationDate && formData.reservationTime && formData.numberOfGuests) {
            setLoading(true);
            setIsSearching(false); // hide result while loading

            setTimeout(() => {
                setLoading(false);
                setIsSearching(true);
                setTables(tablesArray); // optionally filter based on formData
            }, 5000);
        } else {
            setIsSearching(false);
            setLoading(false);
        }
    };

    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                // bgImage="/assets/images/background/hero-background-1.png"
                // bgImage='/assets/images/home/hero-background.webp'
                bgImage="/assets/images/about/About.webp"
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
                    We have found <span className='text-primaryColor'>{tables.length}</span> tables available for you. If you need any assistance, please{' '}
                    <span className='text-primaryColor'>please contact us</span>.
                </div>
            )}

            <div className="mx-auto px-4 grid grid-cols-1 gap-10 my-10">
                {!loading && tables.map((table, idx) => (
                    <RoomCard
                        key={idx}
                        {...table}
                        className={idx % 2 === 0 ? 'left-5' : 'right-5'}
                        redirectionURL={`/table-view/${table.id}`}
                        bookNowURL={`/table-book/${table.id}`}
                        state={{ bookingType: 'TABLE' }}
                    />
                ))}
            </div>
        </main>
    )
}

export default DineWithUs
