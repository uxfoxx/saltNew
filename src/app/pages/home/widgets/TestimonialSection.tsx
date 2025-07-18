import React from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const TestimonialSection: React.FC = () => {

    const FaQuoteLefts = FaQuoteLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaArrowLefts = FaArrowLeft as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaArrowRights = FaArrowRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaStars = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    return (
        <section className="bg-white py-16 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    REAL EXPERIENCES, GENUINE TRUST, EXCEPTIONAL
                </h2>
                <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                    Discover what our satisfied clients say about our design expertise, creativity,
                    and commitment to turning visions into reality.
                </p>
            </div>

            {/* Testimonial Grid */}
            <div className="grid gap-10 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center">
                {/* Left Text Column */}
                <div className="space-y-4">
                    <FaQuoteLefts className="text-3xl text-teal-600" />
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Working with was an incredible experience. They truly understood my vision and transformed
                        my space into a perfect blend of elegance and functionality.
                    </p>
                    <div>
                        <h4 className="font-bold">Jessica Alana</h4>
                        <p className="text-sm text-gray-500">Jakarta, Indonesia</p>
                        <div className="text-yellow-400 flex gap-1 mt-1">
                            {Array(5).fill(null).map((_, i) => (
                                <FaStars key={i} />
                                // <>★</>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Image */}
                <div className="grid grid-cols-2 gap-4 justify-between">
                    <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-xl text-3xl text-gray-500">
                        📷
                    </div>

                    {/* Right Thumbnails */}
                    <div className="flex flex-col gap-4 w-full h-full justify-between">
                        <div className="flex flex-row gap-4 w-full justify-between">
                            <div className="w-full h-36 bg-gray-200 rounded-xl flex items-center justify-center text-xl text-gray-500">
                                +
                            </div>
                            <div className="w-full h-36 bg-gray-200 rounded-xl flex items-center justify-center text-xl text-gray-500">
                                +
                            </div>
                        </div>
                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                            <button className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition">
                                <FaArrowLefts />
                            </button>
                            <button className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition">
                                <FaArrowRights />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default TestimonialSection;
