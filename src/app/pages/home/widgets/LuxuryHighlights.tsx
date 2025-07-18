import { Link } from "react-router-dom";

const features = [
    { number: "01", title: "Elegant Interiors", text: "Stylishly appointed rooms designed for comfort and charm." },
    { number: "03", title: "Eco-Friendly Living", text: "Sustainable design with a mindful touch of nature." },
    { number: "02", title: "Unmatched Luxury", text: "Premium finishes, lush bedding, and curated experiences." },
    { number: "04", title: "Exclusive Service", text: "Personalized attention to make every moment special." },
];

const LuxuryHighlights: React.FC = () => (
    <section className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-2xl font-bold mb-6 uppercase">Experience the Best of Luxury & Comfort</h2>
                <p className="mb-8 text-gray-600 text-sm">Enjoy an unforgettable stay with exceptional service, scenic beauty, and world-class facilities. Here{"’"}s what you can look forward to:</p>
                <Link
                    to="/stay-with-us"
                    className="bg-white text-sm text-primaryColor rounded-xl flex items-center gap-2"
                >
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                            fill="currentColor" />
                    </svg>
                    Book Now
                </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-3 items-center">
                {features.map((f, index) => (
                    <div
                        key={index}
                        className={`shadow p-6 flex flex-col gap-3 justify-between rounded-lg relative w-full ${(index === 0 || index === 2) ? '' : 'h-[250px]'}  ${index === 0 ? 'place-self-end' : ''}   ${index === 2 ? 'place-self-start' : ''} `}
                        style={{
                            background: index === 2 ? 'url(/assets/images/background/Artwork.png), linear-gradient(135deg, #529C9D, #3B7576)' : '#F5F5F5',
                            backgroundSize: index === 2 ? 'cover, auto' : 'auto',
                            backgroundPosition: index === 2 ? 'calc(100% + 100px) calc(100% + 150px), center' : 'center',
                            backgroundRepeat: index === 2 ? 'no-repeat, no-repeat' : 'repeat',
                        }}
                    >
                        <span className="text-xl font-bold text-teal-600">{f.number}</span>
                        <h3 className="font-semibold mt-2">{f.title}</h3>
                        <p className="text-xs text-gray-600">{f.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default LuxuryHighlights;
