import React, { useEffect } from 'react'
import { InforIntro } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom';
import { tablesArray } from '../dine-with-us';

const TableView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // get id from url params pop
    const tableId = location.pathname.split('/').pop() || '';
    const [tableData, setTableData] = React.useState<any>(null);
    // const slides = [
    //     {
    //         id: 1,
    //         image: "/assets/images/home/Explore Our Luxury Accommodation 1.webp"
    //     },
    //     {
    //         id: 3,
    //         image: "/assets/images/home/Explore Our Luxury Accommodation 3.webp",
    //     },
    //     {
    //         id: 2,
    //         image: "/assets/images/home/Explore Our Luxury Accommodation 2.webp",
    //     },
    //     {
    //         id: 4,
    //         image: "/assets/images/home/Explore Our Luxury Accommodation 2.webp",
    //     },
    // ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!tableId) {
            navigate('/');
        } else {
            const table = tablesArray.find((t) => t.id === tableId);
            if (table) {
                setTableData(table);
            } else {
                navigate('/');
            }
        }
    }, [tableId, navigate]);

    console.log("Table Data:", tableData);
    return (
        //         <main className="pt-[76px]">
        //             {/* Heading & Book Button */}
        //             <section className="text-center py-10 px-4 flex flex-col items-center justify-center ">
        //                 <h1 className="text-2xl md:text-3xl font-bold mb-4">Beachfront Dining</h1>
        //                 <button
        //                     type='button'
        //                     onClick={() => navigate(`/table-book/${tableId}`, { state: { bookingType: 'TABLE' } })}
        //                     className="flex items-center gap-2  justify-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-5 py-2 rounded"
        //                 >
        //                     <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        //                         <path
        //                             d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
        //                             fill="currentColor" />
        //                     </svg>
        //                     Book Now
        //                 </button>
        //             </section>

        //             {/* Swiper Gallery */}
        //             <SwiperComponent
        //                 images={slides}
        //                 breakpoints={{
        //                     768: { slidesPerView: 2, spaceBetween: 10 },
        //                     1024: { slidesPerView: 3, spaceBetween: 15 },
        //                 }}
        //                 slideWidth="w-full"
        //                 slideHeight="h-80"
        //             />

        //             {/* Overview + Facilities */}
        //             <section className="grid md:grid-cols-2 gap-8 mx-auto px-4 pb-16">
        //                 <div>
        //                     <h2 className="text-lg font-semibold mb-2">Overview</h2>
        //                     <p className="text-gray-600 text-sm leading-relaxed">
        //                         Experience a stay where comfort meets convenience. Each Deluxe Double Sharing Room is equipped with essential amenities to ensure a relaxing stay amidst the calm of Mirissa's coast.
        //                     </p>
        //                     <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
        //                         <li>Flat-screen smart TV</li>
        //                         <li>Air conditioning for your comfort</li>
        //                         <li>Tea/coffee facilities with a kettle and toaster</li>
        //                         <li>Microwave for light meals or reheating</li>
        //                         <li>En-suite bathroom with modern fittings</li>
        //                         <li>Private outdoor space or seating area</li>
        //                     </ul>
        //                     <p className="text-gray-600 text-sm leading-relaxed mt-4">
        //                         Perfect for couples or solo travelers, this room offers a peaceful setting just moments from the beach.
        //                     </p>
        //                 </div>

        //                 {/* Facilities */}
        //                 <div>
        //                     <h2 className="text-lg font-semibold mb-4">Top Facilities at Salt Mirissa</h2>
        //                     <ul className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
        //                         {/* ✔️ Free Wi-Fi – Stay connected effortlessly
        // ✔️ Air Conditioning – Climate control for all seasons
        // ✔️ Private Parking – Complimentary on-site parking
        // ✔️ Business Services – Ideal for remote work or meetings
        // ✔️ Swimming Pool – Refresh and relax at your leisure
        // ✔️ Top Rated in Area – Trusted and loved by travelers */}

        //                         {/* <li> <img src='/assets/images/icons/home-wifi.svg' alt="Free wifi" className='w-4 h-4 inline-block mr-2' />Free wifi</li> */}
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Free Wi-Fi" className="w-4 h-4 inline-block" />
        //                             Free Wi-Fi – Stay connected effortlessly
        //                         </li>
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Air Conditioning" className="w-4 h-4 inline-block" />
        //                             Air Conditioning – Climate control for all seasons
        //                         </li>
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Private Parking" className="w-4 h-4 inline-block" />
        //                             Private Parking – Complimentary on-site parking
        //                         </li>
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Business Services" className="w-4 h-4 inline-block" />
        //                             Business Services – Ideal for remote work or meetings
        //                         </li>
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Swimming Pool" className="w-4 h-4 inline-block" />
        //                             Swimming Pool – Refresh and relax at your leisure
        //                         </li>
        //                         <li className="flex items-center gap-2">
        //                             <img src="/assets/images/icons/home-wifi.svg" alt="Top Rated" className="w-4 h-4 inline-block" />
        //                             Top Rated in Area – Trusted and loved by travelers
        //                         </li>

        //                     </ul>
        //                 </div>
        //             </section>
        //         </main>
        <main className="pt-[76px]">
            <InforIntro
                reverse={false}
                imageUrl={tableData?.image || '/assets/images/home/Explore Our Luxury Accommodation 1.webp'}
                title={tableData?.title || 'Beachfront Dining'}
                reserveLink={`/table-book/${tableId}`}
                reserveText="Reserve a table"
                description={`
                    <body class="text-gray-600 text-sm leading-relaxed">
                    ${tableData?.description}
                    <ul class="list-disc pl-5 mt-2">
                    ${tableData?.amenities?.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                    <br/>
                    ${tableData?.viewMore}
                     </body>
                    `
                }
                state={{ bookingType: 'TABLE' }}
            />
        </main>
    )
}

export default TableView
