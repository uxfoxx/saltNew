import React from 'react';
import { Input, Select, DatePicker } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';

const { TextArea } = Input;
const { Option } = Select;

const TableBookingStepTwo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 w-full">
            {/* Sidebar Summary */}
            <div className="border rounded-lg p-4 shadow-custom6 text-sm">
                <h3 className="font-semibold mb-2">Reservation</h3>
                <p className="mb-1">Thu 1 May 2025</p>
                <p className="mb-1">14:30 – 18:00</p>
                <p className="mb-1 font-semibold">4 guests</p>
                <p className="mb-1">Total Number of Tables</p>
                <p className="font-semibold mb-4">2 Tables</p>
                <div className="flex justify-between items-center">
                    <span>BEACH SIDE TABLE</span>
                    <span className="text-teal-600 font-medium">2 Tables</span>
                </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
                {/* Sign in prompt */}
                <div className="border rounded-lg p-4 shadow-custom6">
                    <h3 className="font-medium mb-2">Sign in to save and easily manage your bookings</h3>
                    <div className="text-sm text-blue-600">
                        <Link to="/sign-in" className="mr-4 hover:underline">Sign in</Link>
                        <Link to="/sign-up" className="hover:underline">Register</Link>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-4">
                    <h4 className="text-base font-semibold underline underline-offset-2">Personal information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="First Name" className="w-full" />
                        <Input placeholder="Last Name" className="w-full" />
                        <Input placeholder="Email" className="w-full" />
                        <DatePicker className="w-full" placeholder="Date of birth" />
                        <Select
                            defaultValue="Sri Lanka"
                            className="w-full"
                        >
                            <Option value="Sri Lanka">Sri Lanka</Option>
                            <Option value="India">India</Option>
                            <Option value="UK">UK</Option>
                        </Select>
                        <div className='hidden md:block' />
                        <PhoneInput
                            country={'lk'}
                            // value={phone}
                            // onChange={(phone, countryData) => {
                            //     setPhone(phone);            // E.164 formatted string
                            //     setCountryCode(countryData.dialCode); // '+94'
                            // }}
                            inputStyle={{ width: '100%' }}
                            containerStyle={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* Special Requests */}
                <div className="border rounded-lg p-4 shadow-custom6">
                    <h4 className="text-base font-semibold mb-2">Special requests</h4>
                    <TextArea placeholder="Write your message.." rows={4} />
                </div>

                {/* Arrival Time */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-2">
                    <h4 className="text-base font-semibold mb-2">Your arrival time</h4>
                    <p className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircleFilled className="text-green-500" /> Your room will be ready for check-in between 14:30 and 18:00
                    </p>
                    <div className="mt-2">
                        <Select placeholder="Please select" className="w-full">
                            <Option value="14:30">14:30</Option>
                            <Option value="15:00">15:00</Option>
                            <Option value="15:30">15:30</Option>
                            <Option value="16:00">16:00</Option>
                            <Option value="16:30">16:30</Option>
                            <Option value="17:00">17:00</Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableBookingStepTwo;
