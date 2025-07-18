
import React from 'react'

interface FloatingButtonsProps {
    onClick: () => void;
    href?: string;
    icon: string;
    divOrAnchor: 'div' | 'a';
    className?: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onClick, href, icon, divOrAnchor = 'div', className }) => {
    const Component = divOrAnchor;

    return (
        <Component
            onClick={onClick}
            {...(divOrAnchor === 'a' ? { href } : {})}
            className={`bg-primaryColor w-12 h-12 md:w-16 md:h-16 text-lg md:text-2xl text-white rounded-full text-center flex items-center justify-center cursor-pointer shadow-black shadow-sm transition-transform transform hover:scale-110 ${className}`}
        >
            <i className={icon}></i>
        </Component>
    );
};

export default FloatingButtons;





