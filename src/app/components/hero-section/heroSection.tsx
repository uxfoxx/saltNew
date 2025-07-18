import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    className?: string;
    component?: React.ReactNode;
    bgImage?: string;
    pageTitle?: string;
    subTitle?: string;
}
const HeroSection: React.FC<HeroSectionProps> = ({ className, component, bgImage, pageTitle, subTitle }) => {
    return (
        <div className={`${className} relative p-2 rounded-xl overflow-hidden`}>
            <img
                src={`${bgImage || 'assets/images/background/hero-background.png'}`}
                alt="Background"
                className="object-cover w-full h-full rounded-xl overflow-hidden"
            />
            {pageTitle ? (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full sm:w-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-lg w-full"
                    >
                        <h1 className="text-[48px] font-bold text-white uppercase">{pageTitle}</h1>
                        <p className="text-white text-xs">{subTitle}</p>
                    </motion.div>
                </div>
            ) : (component &&
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-4 rounded-lg shadow-lg"
                    >
                        {component}
                    </motion.div>
                </div >
            )}
        </div >
    );
};

export default HeroSection;
