import React from "react";
import { useAppContext } from "../../../contexts/AppContext";

interface AdminNavBarProps {
    isOpen: boolean;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ isOpen }) => {
    const { me } = useAppContext();
    return (
        <div className={`fixed z-40 top-0 left-0 w-full text-secondaryColor bg-primaryColor shadow-md flex items-center justify-between p-4 ${isOpen ? "pl-[5rem] sm:pl-[17rem]" : "pl-[5rem]"} transition-all duration-300 ease-in-out`}>
            <h1 className="text-base md:text-2xl font-bold">Admin Panel</h1>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img
                        src="/assets/images/logo/logo.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden md:block">
                    <h1 className="text-xs md:text-base font-semibold">{me?.username}</h1>
                    <p className="text-xs text-gray-500">{me?.username}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;
