const AboutSection: React.FC = () => {
    return (
        <section className="grid md:grid-cols-2 gap-6 my-16 px-4">
            <div className="grid grid-cols-2 gap-4">
                <img
                    src="/assets/images/about/New world of flavors 1.webp"
                    className="rounded-lg h-full w-full object-cover pb-20"
                    alt="About 1 background"
                />
                <div className="grid gap-4">
                    <img
                        src="/assets/images/about/New world of flavors 3.webp"
                        className="rounded-lg h-60 w-full object-cover mt-10 place-self-end"
                        alt="About 2 background"
                    />
                    <img src="/assets/images/about/New world of flavors 4 chef nihal.webp"
                        className="rounded-lg h-80 w-full object-cover"
                        alt="About 3 background"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Savor the Spirit of Mirissa</h2>
                <p className="text-gray-700 text-sm">
                    At Salt Mirissa, food is more than just a meal. It is a carefully curated experience that blends quality, creativity, and heartfelt hospitality. Our kitchen is proudly led by Mr. Nihal Senanayake, a distinguished chef with over 25 years of culinary experience both in Sri Lanka and internationally. His journey has taken him through renowned kitchens across Southeast Asia and the Middle East, where he mastered the art of combining bold flavors with refined techniques.
                    <br /> <br />
                    Chef Nihal has received multiple accolades over his career, including recognition from Sri Lanka’s leading hospitality associations and awards for excellence in fusion cuisine. Known for his calm leadership and deep respect for ingredients, he brings both tradition and innovation into every dish he creates.
                    <br /> <br />
                    At Salt, every plate begins with the freshest locally sourced ingredients from coastal seafood to handpicked herbs. Our open kitchen invites guests to witness the care and precision that goes into each meal, from preparation to presentation. With a strong foundation in authentic Sri Lankan recipes and modern global influences, Chef Nihal crafts menus that reflect the richness of the island and the creativity of world cuisine.
                    <br /> <br />
                    Whether you join us for a beachfront lunch or a candlelit dinner, dining at Salt Mirissa is a sensory experience designed to satisfy and inspire. Chef Nihal’s passion and expertise are at the heart of it all, promising meals you’ll remember long after your stay.

                </p>
            </div>
        </section>
    );
};

export default AboutSection;
