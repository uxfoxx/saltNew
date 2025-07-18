import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./swiper.css";

interface ImageData {
    id: number;
    image: string;
}

interface SwiperComponentProps {
    isPagination?: boolean;
    isAutoplay?: boolean;
    images?: ImageData[];
    breakpoints?: {
        [width: number]: {
            slidesPerView: number;
            spaceBetween: number;
        };
    };
    slideWidth?: string; // Tailwind width (e.g., 'w-56', 'w-64')
    slideHeight?: string; // Tailwind height (e.g., 'h-64', 'h-80')
    containerClass?: string; // Additional class for the container
}

const defaultBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    480: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 3 },
    768: { slidesPerView: 3, spaceBetween: 3 },
    1024: { slidesPerView: 4, spaceBetween: 3 },
    1280: { slidesPerView: 5, spaceBetween: 3 },
    1440: { slidesPerView: 6, spaceBetween: 3 },
    1600: { slidesPerView: 7, spaceBetween: 3 },
    1800: { slidesPerView: 8, spaceBetween: 3 },
    1920: { slidesPerView: 8, spaceBetween: 3 },
};

const SwiperComponent: React.FC<SwiperComponentProps> = ({
    isPagination = true,
    isAutoplay = true,
    images = [],
    breakpoints = defaultBreakpoints,
    slideWidth = "w-56",
    slideHeight = "h-64",
    containerClass = "min-h-[60vh]",
}) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className={`flex justify-center flex-col items-center relative ${containerClass}`}>
            <div className="w-full">
                <Swiper
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    centeredSlides={true}
                    breakpoints={breakpoints}
                    loop={true}
                    autoplay={
                        isAutoplay ? { delay: 3000, disableOnInteraction: true } : false
                    }
                    pagination={isPagination ? { clickable: true } : false}
                    modules={[Autoplay, Pagination]}
                >
                    {images.map((image, idx) => (
                        <SwiperSlide key={idx}>
                            {({ isActive, isNext, isPrev }) => (
                                <div
                                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                                    className={`cursor-pointer rounded-xl shadow-lg bg-gray-100 flex flex-col items-center justify-center ${slideWidth} ${slideHeight} mx-auto
                    transition-all duration-500 ease-in-out mb-10
                    ${isActive
                                            ? "scale-100 z-30"
                                            : isNext || isPrev
                                                ? "scale-[.85] opacity-100 z-20"
                                                : "scale-[.85] opacity-100 z-10"
                                        }
                  `}
                                >
                                    <img
                                        src={image.image}
                                        alt={`Slide ${image.id}`}
                                        className="w-full h-full object-cover rounded-xl text-sm"
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SwiperComponent;
