import { Avatar } from 'antd';
import { LoaderIcon } from 'lucide-react';
import React from 'react'
import { UserIf } from '../../../../types';

interface UserTabProps {
    profileImage: string | null;
    profileData: UserIf | null;
    isLoading: boolean;
    userType: string | null;
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    renderTabContent: () => React.ReactNode;
    handleAvatarClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

const UserTab: React.FC<UserTabProps> = ({
    profileImage,
    profileData,
    isLoading,
    userType,
    tabs,
    activeTab,
    setActiveTab,
    renderTabContent,
    handleAvatarClick,
    handleFileChange,
    fileInputRef
}) => {
    return (
        <>
            <div className="text-center mb-6 pt-10">
                <div className="relative w-24 h-24 mx-auto cursor-pointer" onClick={handleAvatarClick}>
                    <Avatar src={profileImage!} size={96} />
                    <div className="absolute bottom-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        ✎
                    </div>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                <h2 className="mt-3 font-bold text-xl">
                    {profileData ? `${profileData.first_name} ${profileData.last_name} (${userType})` : userType}
                </h2>
                <p className="text-gray-500">
                    {profileData ? profileData.email : ''}
                </p>
            </div>

            {/* Custom Tab Headers */}
            <div className="flex border rounded-lg overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`w-1/3 py-2 font-medium text-xs md:text-sm border-r last:border-r-0 transition-all text-center ${activeTab === tab
                            ? 'bg-white text-teal-600 font-semibold'
                            : 'bg-gray-50 text-gray-500 hover:text-black'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div className="mt-6 w-full">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 ">
                        <LoaderIcon className="animate-spin text-primaryColor w-8 h-8" />
                    </div>
                ) : (
                    renderTabContent()
                )}
            </div>
        </>
    )
}

export default UserTab