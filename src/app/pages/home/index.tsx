import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/hero-section/heroSection';
import { Filter, InforIntro, SwiperComponent } from '../../components';
import BannerOne from './widgets/BannerOne';
import LuxuryHighlights from './widgets/LuxuryHighlights';
import FAQSection from './widgets/FAQSection';
import RoomShowcase from './widgets/RoomShowcase';
import TestimonialSection from './widgets/TestimonialSection';
import GradientScrollMarquee from './widgets/GradientScrollMarquee';
import CrossedMarqueeSection from './widgets/CrossedMarqueeSection';
import WelcomePage from './widgets/WelcomePage';
import { FilterFieldConfig, FormDataProps } from '../../../types';
import { commonSlides } from '../../data/data';

const Home: React.FC = () => {

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
        // Handle form submission logic here 
    }



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <HeroSection
                bgImage='/assets/images/home/hero-background.webp'
                className='min-h-full h-[100dvh]'
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
            <GradientScrollMarquee />
            <WelcomePage />
            <div className='relative bg-white'>
                <SwiperComponent
                    images={commonSlides}
                    slideWidth="w-60"
                    containerClass='min-h-[40vh] bg-[#4E9393]/10'
                />
            </div>
            <BannerOne />
            <div className='relative bg-[#4E9393]/10'>
                <InforIntro
                    reverse={false}
                    imageUrl="/assets/images/home/Creating a New World of Flavors.webp"
                    title="Creating a New World of Flavors"
                    reserveLink="/dine-with-us"
                    reserveText="Reserve a table"
                    description={
                        `At Salt, we believe that great food brings people together. Our kitchen is a melting pot of global tastes and local ingredients, designed to awaken your palate and leave a lasting impression.
                    <br />
                    <br />
                    From beachside bites to beautifully plated mains, every dish is created with heart and skill. Led by expert chefs, our culinary team crafts vibrant, flavor-forward meals using fresh produce and the finest seafood, all served in a setting as inspiring as the food itself.`
                    }
                />
            </div>
            <LuxuryHighlights />
            <CrossedMarqueeSection />
            <RoomShowcase />
            <FAQSection />
            <TestimonialSection />
        </>
    );
};

export default Home;
