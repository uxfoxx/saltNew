import React, { useEffect } from 'react';
import HeroSection from '../../components/hero-section/heroSection';
import ContactInfoCard from './widgets/ContactInfoCard';
import GoogleMapEmbed from './widgets/GoogleMapEmbed';

const ContactUs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                bgImage="/assets/images/background/hero-background-1.png"
                pageTitle="Contact Us"
                subTitle="Need help with a reservation or have a special request? Reach out to our team — we’re here to make your Salt Mirissa experience seamless."
            />
            <div className='w-full mx-auto px-4'>
                <ContactInfoCard />
                <section className="text-center py-16">
                    <h2 className="text-3xl font-bold mb-4 uppercase">FIND US</h2>
                    <p className="text-gray-600 text-sm max-w-xl mx-auto">
                        Salt Mirissa is located right along the stunning southern coastline of Sri Lanka. Just steps away from the beach, our space is easy to find and impossible to forget. Whether you’re arriving from Colombo or exploring the southern coast, we’re perfectly placed for your seaside escape
                    </p>
                </section>
                <section className="pb-16">
                    < GoogleMapEmbed />
                </section>
            </div>
        </main>
    );
};

export default ContactUs;
