import React, { useEffect } from "react";
import SearchBar from "../../components/common/SearchBar";
import BlogCard from "../../components/card/BlogCard";
import HeroSection from "../../components/hero-section/heroSection";
import { blogSlides } from "../../data/data";






const BlogPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                // bgImage="/assets/images/background/hero-background-1.png"
                // bgImage='/assets/images/home/hero-background.webp'
                bgImage="/assets/images/about/About.webp"
                pageTitle="Blog List"
                subTitle="Get inspired by stories from the coast — from travel tips and wellness insights to behind-the-scenes moments at Salt Mirissa."
            />
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-16">
                {blogSlides.map((post, idx) => (
                    <BlogCard key={idx} {...post} />
                ))}
            </div>
        </main>
    );
};

export default BlogPage;
