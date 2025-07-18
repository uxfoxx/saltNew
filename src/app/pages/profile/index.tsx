import React, { useEffect, useRef, useState } from 'react';
import AccountTab from './tabs/AccountTab';
import HistoryTab from './tabs/HistoryTab';
import PaymentTab from './tabs/PaymentTab';
import { GET } from '../../auth/AxiosHelper';
import Api from '../../../api/api';
import { UserIf } from '../../../types';
import { useAppContext } from '../../../contexts/AppContext';
import { getUserType } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import UserTab from './tabs/UserTab';
import AdminTab from './tabs/AdminTab';

const tabs = ['Account', 'History', 'Payment methods'];

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const { me } = useAppContext();
    const [activeTab, setActiveTab] = useState('Account');
    const [profileImage, setProfileImage] = useState<string | null>('/avatar.jpg');
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState<UserIf | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userType, setUserType] = useState<string | null>(null);

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            const res = await GET(Api.user.profile);
            setProfileData(res.data?.data);
            setIsLoading(false);
            console.log("User profile fetched successfully:", res);
        } catch (error) {
            setIsLoading(false);
            setProfileData(null);
            setProfileImage('/avatar.jpg');
            console.error("Error fetching user profile:", error);
        }
    };



    const renderTabContent = () => {
        switch (activeTab) {
            case 'Account': return <AccountTab profileData={profileData} fetchUserProfile={fetchUserProfile} />;
            case 'History': return <HistoryTab />;
            case 'Payment methods': return <PaymentTab />;
            default: return null;
        }
    };

    useEffect(() => {
        const userType = getUserType(me ? me.role : 0);

        if (userType === 'GUEST') {
            navigate('/sign-in', { replace: true });
            return;
        } else if (userType === 'CLIENT') {
            fetchUserProfile();
            setUserType('Client');
        } else if (userType === 'STAFF') {
            setUserType('Staff');
        } else if (userType === 'MANAGER') {
            setUserType('Manager');
        } else if (userType === 'SUPER_ADMIN') {
            setUserType('Super Admin');
        } else {
            setUserType(null);
        }
    }, [me, navigate]);


    return (
        <main className="pt-[76px] container mx-auto px-4 md:px-8 lg:px-16 pb-8">
            {userType === 'Client' && (
                <UserTab
                    profileImage={profileImage}
                    profileData={profileData}
                    isLoading={isLoading}
                    userType={userType}
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    renderTabContent={renderTabContent}
                    handleAvatarClick={handleAvatarClick}
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                />
            )}
            {userType && userType !== 'Client' && (
                <AdminTab userType={userType} />
            )}
        </main>
    );
};

export default UserProfile;
