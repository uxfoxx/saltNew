import React, { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { InputField } from '../../../components';
import { UserIf } from '../../../../types';
import PhoneInput from 'react-phone-input-2';
import dayjs from 'dayjs';
import { PUT } from '../../../auth/AxiosHelper';
import Api from '../../../../api/api';
import { showToast } from '../../../components/common/Toast';

const countryOptions = [
    { label: 'Sri Lanka', value: 'Sri Lanka' },
    { label: 'Maldives', value: 'Maldives' },
    { label: 'Thailand', value: 'Thailand' }
];

interface AccountTabProps {
    profileData: UserIf | null;
    fetchUserProfile: () => Promise<void>;
}

const AccountTab: React.FC<AccountTabProps> = ({ profileData, fetchUserProfile }) => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        country: '',
        phone_number: ''
    });

    const [tempForm, setTempForm] = useState({ ...form });
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (profileData) {
            const newForm = {
                first_name: profileData.first_name || '',
                last_name: profileData.last_name || '',
                email: profileData.email || '',
                date_of_birth: profileData.date_of_birth
                    ? dayjs(profileData.date_of_birth).format('YYYY-MM-DD')
                    : '',
                country: profileData.country || '',
                phone_number: profileData.phone_number?.replace('+', '') || ''
            };
            setForm(newForm);
            setTempForm(newForm);
        }
    }, [profileData]);

    const openEditModal = () => {
        setTempForm({ ...form });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        try {
            setForm({ ...tempForm });
            setIsModalVisible(false);
            const updatedProfile = {
                first_name: tempForm.first_name,
                last_name: tempForm.last_name,
                phone_number: `+${tempForm.phone_number}`,
                date_of_birth: tempForm.date_of_birth,
                country: tempForm.country
            };

            // Send updated profile to backend
            await PUT(Api.user.updateProfile, updatedProfile);
            showToast({
                type: "success",
                toastId: "profile-update-success",
                message: "Profile updated successfully!"
            });
            await fetchUserProfile(); // refresh from backend if needed
        } catch (error) {
            console.error("Error updating profile:", error);
            showToast({
                type: "error",
                toastId: "profile-update-error",
                message:
                    (error && typeof error === "object" && "response" in error && (error as any).response?.data?.error) ||
                    "Failed to update profile. Please try again."
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id?: string) => {
        const { name, value } = e.target;
        const key = id || name;
        setTempForm((prev) => ({ ...prev, [key]: value }));
    };
    const handleSelectChange = (value: string, key: string) => {
        setTempForm((prev) => ({ ...prev, [key]: value }));
    };

    const handlePhoneChange = (value: string) => {
        console.log("Phone number changed:", value);
        setTempForm((prev) => ({ ...prev, phone_number: value }));
    };

    return (
        <div className="bg-white p-6 rounded-lg border relative w-full">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Personal information</h3>
                <Button type="primary" onClick={openEditModal}>
                    Edit
                </Button>
            </div>

            {/* Display fields in read-only mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    value={form.first_name}
                    disabled
                />
                <InputField
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={form.last_name}
                    disabled
                />
                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    disabled
                />
                <InputField
                    label="Date of Birth"
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    placeholder="Date of Birth"
                    value={form.date_of_birth}
                    disabled
                />
                <div className="flex flex-col gap-2">
                    <label className="text-primaryColor font-medium text-sm">Country/Region</label>
                    <Select value={form.country} options={countryOptions} disabled />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-primaryColor font-medium text-sm">Phone Number</label>
                    <div className="w-full relative">
                        <PhoneInput
                            country={undefined}
                            value={form.phone_number}
                            inputStyle={{ width: '100%' }}
                            containerStyle={{ width: '100%' }}
                            disabled
                        />
                        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none bg-[#0000000a]  rounded-md">
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for editing */}
            <Modal
                title="Edit Personal Information"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
                okText="Save"
                cancelText="Cancel"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="First Name"
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        value={tempForm.first_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Last Name"
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        value={tempForm.last_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={tempForm.email}
                        disabled
                    />
                    <InputField
                        label="Date of Birth"
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        placeholder="Date of Birth"
                        value={tempForm.date_of_birth}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'date_of_birth')}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-primaryColor font-medium text-sm">Country/Region</label>
                        <Select
                            value={tempForm.country}
                            onChange={(val) => handleSelectChange(val, 'country')}
                            options={countryOptions}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-primaryColor font-medium text-sm">Phone Number</label>
                        <PhoneInput
                            country={undefined}
                            value={tempForm.phone_number}
                            onChange={handlePhoneChange}
                            inputStyle={{ width: '100%' }}
                            containerStyle={{ width: '100%' }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AccountTab;
