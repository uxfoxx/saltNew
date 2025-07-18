import React from 'react';
interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: string;
    isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, isPositive = true }) => {
    return (
        <div className="w-full min-h-[130px] h-[130px] shadow-custom6 rounded-lg bg-white p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center h-full">
                <div className='flex flex-col gap-1 justify-between h-full'>
                    <div className="text-gray-500">{title}</div>
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className={`text-${isPositive ? 'green' : 'red'}-500`}>
                            {isPositive ? `↑ ${change}` : `↓ ${change}`}
                        </span>
                        <span className="text-gray-500">
                            from last period
                        </span>
                    </div>
                </div>
                <div className="text-2xl bg-[#eff6ff] p-2 rounded-lg">{icon}</div>
            </div>
        </div>
    );
};

export default StatCard;
