import React, { useEffect } from "react";
import HeroSection from "../../components/hero-section/heroSection";
import { InforIntro, SwiperComponent } from "../../components";
import FeatureCard from "../../components/card/FeatureCard";
import AboutSection from "./widgets/AboutSection";
import { commonSlides, menuSlides } from "../../data/data";


const About: React.FC = () => {
    const features = [
        { Icon: '/assets/images/icons/Person.svg', title: "Best Chefs in the Region", description: "Our chefs bring years of experience, passion, and innovation to every plate." },
        { Icon: '/assets/images/icons/Coffee.svg', title: "Over 120 Signature Dishes", description: "A wide variety of choices to suit every appetite and preference." },
        { Icon: '/assets/images/icons/Student.svg', title: "Impeccably Clean & Inviting Spaces", description: "Dine in comfort with a commitment to hygiene and ambience." },
    ];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                bgImage="/assets/images/about/About.webp"
                pageTitle="About Us"
            // subTitle={`Discover the soul of coastal living at Salt Mirissa — where pristine beaches, tranquil ocean views, and refined hospitality come together. Nestled along Sri Lanka’s southern shores, Salt isn’t just a place to stay — it’s an experience built around comfort, connection, and curated moments by the sea.`}
            />
            <div className="min-h-full flex flex-col">
                <InforIntro
                    reverse={true}
                    imageUrl="/assets/images/about/About salt.webp"
                    description={
                        `
                    <p className="text-center text-gray-700 px-4 md:px-20">
                        Salt Mirissa began its journey in 2018, born from a vision to create a space where simplicity meets sophistication along Sri Lanka’s southern coast. What started as a small beachfront property with a love for food and island living has grown into a sought-after destination for travelers from around the world.
                        <br />
                        <br />
                        Inspired by the rhythm of the ocean and the laid-back spirit of Mirissa, the founders, a team of passionate locals and hospitality enthusiasts - envisioned a space that felt both personal and elevated. They chose this stunning stretch of coastline not just for its beauty, but for its soul. The surrounding community, surf culture, and lush landscape became the heart of what Salt represents today.
                        <br />
                        <br />
                        Salt Mirissa was built with one purpose: to offer an experience that brings people closer to what really matters - great food, peaceful sleep, the ocean breeze, and moments that feel like home. Over the years, the property has grown to include elegantly designed villas, signature beachfront dining, and personalized service that reflects the warmth of Sri Lankan hospitality.
                        <br />
                        <br />
                        Every detail at Salt is intentional from the curated interiors that blend modern minimalism with island textures, to a kitchen led by passionate chefs who showcase the flavors of the coast. Whether you're staying for a few nights or simply stopping in for a meal, Salt offers more than a place to stay it’s a place to feel alive, inspired, and connected.
                        <br />
                        <br />
                        Welcome to Salt Mirissa, where the story begins with the sea, and continues with you.
                     </p>
                        `
                    }
                />
                <SwiperComponent
                    images={commonSlides}
                    slideWidth="w-full"
                    containerClass="min-h-[50vh] bg-[#4E9393]/10"
                />
                <InforIntro
                    reverse={false}
                    imageUrl="/assets/images/about/founder msg.webp"
                    title="A Word from Our Founder"
                    imageContent="Mr. Bathisha De Silva"
                    description={
                        `
                        Salt Mirissa began with a simple vision to create a space where people could feel at home by the sea. Since 2018, we’ve focused on offering meaningful experiences through warm hospitality, thoughtful design, and honest food.
                        <br />
                        <br />
                        This place is close to my heart, and I hope it becomes just as special to you. Whether you're here to relax, explore, or reconnect, we’re happy to have you with us.
                        <br />
                        <br />
                        Thank you for choosing Salt Mirissa.

                        `
                    }
                />
                <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10  mx-auto py-12 px-4 text-center">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            Icon={feature.Icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </section>
                <AboutSection />
                {/* <TeamSection /> */}
                <SwiperComponent
                    images={menuSlides}
                    slideWidth="w-full"
                    containerClass="min-h-[50vh] bg-[#4E9393]/10"
                />
            </div>
        </main>
    );
};

export default About;
