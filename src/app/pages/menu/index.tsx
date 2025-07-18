// import React, { useEffect } from 'react';
// import HeroSection from '../../components/hero-section/heroSection';
// import MenuSection from './widgets/MenuSection';

// interface MenuItem {
//     name: string;
//     description: string;
//     price: string;
// }

// const Menu: React.FC = () => {
//     // /assets/images/menu/Menu 1.webp to /assets/images/menu/Menu 20.webp then 
//     // 20 names
//     const itemNames: string[] = [
//         "Spicy Tuna Tartare", "Grilled Octopus", "Shrimp Ceviche", "Lobster Bisque",
//         "Garlic Butter Prawns", "Seared Scallops", "Fish Tacos", "Calamari Rings",
//         "Mussels in White Wine", "Crispy Crab Cakes", "Clam Chowder", "Chili Crab",
//         "Grilled Mahi Mahi", "Tempura Prawns", "Crab-Stuffed Mushrooms", "Avocado Shrimp Salad",
//         "Teriyaki Salmon", "Coconut Shrimp", "Seafood Paella", "Baked Oysters"
//     ];
//     const allMenuItems: MenuItem[] = itemNames.map((name, index) => ({
//         name: name,
//         description: 'Ground cumin, avocado, peeled and cubed',
//         price: '14$',
//     }));

//     // Split into chunks of 4
//     const chunkSize = 1;
//     const groupedItems = Array.from({ length: Math.ceil(allMenuItems.length / chunkSize) }, (_, i) =>
//         allMenuItems.slice(i * chunkSize, i * chunkSize + chunkSize)
//     );

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <main>
//             <HeroSection
//                 className="min-h-[45vh] max-h-[45vh] h-[45vh]"
//                 bgImage='/assets/images/home/hero-background.webp'
//                 // bgImage="/assets/images/about/About.webp"
//                 pageTitle="Menu"
//                 subTitle="Explore our full menu of coastal favorites and international delights — all crafted with fresh, local ingredients and served with oceanfront charm."
//             />

//             <div className="space-y-16 px-4 max-w-6xl mx-auto py-12">
//                 {groupedItems.map((group, index) => (
//                     <MenuSection
//                         key={index}
//                         title={index === 0 ? 'Starter Menu' : 'Main Course'}
//                         items={group}
//                         image={`/assets/images/menu/Menu ${index + 1}.webp`}
//                         reverse={index % 2 !== 0}
//                     />
//                 ))}
//             </div>
//         </main>
//     );
// };

// export default Menu;
import React, { useState } from "react";
import clsx from "clsx";
import HeroSection from "../../components/hero-section/heroSection";

const tabs = [
    "Wine Collection",
    "A La Carte",
    "4 Course Set Menu",
    "Beverage"
];

// Map tab to image ranges (1-based index)
const tabImageMap: Record<string, number[]> = {
    "Wine Collection": [1, 5],
    "A La Carte": [6, 10],
    "4 Course Set Menu": [11, 15],
    "Beverage": [16, 20]
};

const MenuTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Generate images based on active tab
    const imageRange = tabImageMap[activeTab] || [];
    const images = Array.from({ length: imageRange[1] - imageRange[0] + 1 }, (_, idx) => {
        const number = imageRange[0] + idx;
        return `/assets/images/menu/Menu ${number}.webp`;
    });

    return (
        <main>
            <HeroSection
                className="min-h-[45vh] max-h-[45vh] h-[45vh]"
                bgImage="/assets/images/home/hero-background.webp"
                pageTitle="Menu"
                subTitle="Explore our full menu of coastal favorites and international delights — all crafted with fresh, local ingredients and served with oceanfront charm."
            />

            <section className="bg-black text-white py-10">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
                                activeTab === tab
                                    ? "bg-white text-black"
                                    : "bg-gray-500/30 text-white hover:bg-gray-500/50"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-6">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Menu item ${i + 1}`}
                            className="rounded-xl shadow-md object-cover w-full h-64"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MenuTabs;
