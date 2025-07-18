import React from 'react';

interface ChartCardProps {
    title: string;
    placeholder: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, placeholder }) => {
    return (
        <div className="w-full min-h-[240px] shadow-custom6 rounded-lg bg-white p-4 flex flex-col gap-2">
            <div className="text-base font-semibold">{title}</div>
            <div className="min-h-[240px] flex items-center justify-center text-gray-400 bg-black/5">
                {placeholder}
            </div>
        </div>
    );
};

export default ChartCard;
