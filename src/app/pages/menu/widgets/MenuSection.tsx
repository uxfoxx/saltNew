import React from "react";

interface MenuItem {
    name: string;
    description: string;
    price: string;
}

interface MenuSectionProps {
    title: string;
    items: MenuItem[];
    image: string;
    reverse?: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, image, reverse }) => {
    return (
        <section
            className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} gap-8 items-center`}
        >
            {/* Image */}
            <img src={image} alt={title} className="rounded-xl w-full md:w-1/2 h-auto object-cover" />

            {/* Menu Content */}
            <div className="w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <ul className="space-y-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start border-b pb-2">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-500 text-sm">{item.description}</p>
                            </div>
                            <span className="text-teal-700 font-bold text-sm">{item.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default MenuSection;
