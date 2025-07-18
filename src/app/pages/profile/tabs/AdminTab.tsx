import React from 'react';

interface AdminTabProps {
    userType: string | null;
}

const AdminTab: React.FC<AdminTabProps> = ({ userType }) => {
    return (
        <div className="p-6 bg-white rounded shadow-sm min-h-[200px]">
            <h2 className="text-xl font-semibold mb-4">
                {userType ? `${userType} Profile` : 'Profile'}
            </h2>

            <div className="text-gray-500">
                This section will display role-specific profile details for{' '}
                <span className="font-medium text-gray-700">
                    {userType || 'User'}.
                </span>
                <br />
                Features like profile info, permissions, and editable fields will appear here.
            </div>

            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded bg-gray-50 text-center text-sm text-gray-400">
                🔧 Profile content under development.
            </div>
        </div>
    );
};

export default AdminTab;
