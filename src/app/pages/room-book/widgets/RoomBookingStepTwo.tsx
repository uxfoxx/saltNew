import React from 'react';
import { Input, Select, Radio } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { InputField } from '../../../components';

const { TextArea } = Input;
const { Option } = Select;

const RoomBookingStepTwo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-6 w-full">
            {/* Sidebar Summary */}
            <div className="space-y-4">
                <div className='border rounded-lg p-4 shadow-custom6 text-sm'>
                    {/* Dates */}
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-xs text-gray-500">Check-in</h4>
                            <p className="font-semibold">Thu 1 May 2025</p>
                            <p className="text-xs text-gray-500">14:30 – 18:00</p>
                        </div>
                        <div>
                            <h4 className="text-xs text-gray-500">Check-out</h4>
                            <p className="font-semibold">Fri 2 May 2025</p>
                            <p className="text-xs text-gray-500">11:00 – 12:00</p>
                        </div>
                    </div>
                    <div className='text-xs space-y-2 pt-4'>
                        <p className="">Total Number of Guests</p>
                        <p className="font-semibold">4 guests</p>
                        <p className="pt-2">Total Number of Rooms</p>
                        <p className="font-semibold">2 Rooms</p>
                    </div>
                </div>
                {/* Room Items */}
                <div className="space-y-4">
                    <div className="flex justify-between text-xs border rounded-lg p-4 shadow-custom6">
                        <span className="font-semibold">DELUXE DOUBLE SHARING ROOM</span>
                        <span className="text-teal-600 font-medium">3 Rooms</span>
                    </div>
                    <div className="flex justify-between text-xs border rounded-lg p-4 shadow-custom6">
                        <span className="font-semibold">DELUXE DOUBLE SHARING ROOM</span>
                        <span className="text-teal-600 font-medium">3 Rooms</span>
                    </div>
                </div>



                {/* Price Info */}
                <div className="border rounded-xl p-4 text-sm space-y-4">
                    {/* Title */}
                    <h4 className="font-semibold">Price information</h4>

                    {/* Exchange rate info */}
                    <div className="flex items-start gap-2">
                        <span className="text-lg">💱</span>
                        <p className="text-xs">
                            This price is converted to show you the approximate cost in LKR.
                            You’ll pay in <strong>US$</strong> or <strong>LKR</strong>. The exchange rate may change<br />
                            before you pay.
                        </p>
                    </div>

                    {/* Transaction fee notice */}
                    <div className="flex items-start gap-2">
                        <span className="text-lg">💳</span>
                        <p className="text-xs">
                            Bear in mind that your card issuer may charge you a foreign transaction fee.
                        </p>
                    </div>

                    {/* Cancellation & fee */}
                    <div>
                        <p className="text-green-600 font-medium text-xs">Free cancellation before 30 Apr</p>
                        <div className="flex justify-between text-gray-600 text-xs">
                            <span>From 00:00 on 30 Apr</span>
                            <span>LKR 15,995</span>
                        </div>
                    </div>

                    {/* Total block */}
                    <div className="bg-[#e9f2f2] px-4 py-3 rounded-md space-y-1">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-[#3b7576] text-lg font-bold">LKR 31,989.06</span>
                        </div>
                        <p className="text-xs text-gray-600 text-end">Includes taxes and charges</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
                {/* Sign in prompt */}
                <div className="border rounded-lg p-4 shadow-custom6">
                    <h3 className="font-semibold text-sm mb-2">Sign in to save and easily manage your bookings</h3>
                    <div className="text-sm text-primaryColor">
                        <Link to="/sign-in" className="mr-4 hover:underline">Sign in</Link>
                        <Link to="/sign-up" className="hover:underline">Register</Link>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-4">
                    <h4 className="text-base font-semibold">Personal information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField id='firstName' label="First Name" name="firstName" placeholder="First Name" type='text' />
                        <InputField id='lastName' label="Last Name" name="lastName" placeholder="Last Name" type='text' />
                        <InputField id='email' label="Email" name="email" placeholder="Email" type='email' />
                        <InputField id='dateOfBirth' label="Date of Birth" name="dateOfBirth" placeholder="Date of Birth" type='date' />
                        <InputField id='country' label="Country" name="country" placeholder="Country" type='select' options={[
                            { value: 'Sri Lanka', label: 'Sri Lanka' },
                            { value: 'India', label: 'India' },
                            { value: 'UK', label: 'UK' }
                        ]} />
                        <div className='hidden md:block' />
                        <PhoneInput
                            country={'lk'}
                            inputStyle={{ width: '100%' }}
                            containerStyle={{ width: '100%' }}
                            searchStyle={{ width: '100%' }}
                            inputClass="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Add to stay */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-2">
                    <h4 className="text-base font-semibold">Add to your stay</h4>
                    <Radio.Group defaultValue="Bed & Breakfast">
                        <div className="flex flex-col gap-2">
                            <Radio value="Bed & Breakfast">Bed & Breakfast</Radio>
                            <Radio value="Half Board">Half Board</Radio>
                            <Radio value="All Inclusive">All Inclusive</Radio>
                        </div>
                    </Radio.Group>
                </div>

                {/* Special Requests */}
                <div className="border rounded-lg p-4 shadow-custom6">
                    <h4 className="text-base font-semibold mb-2">Special requests</h4>
                    <TextArea placeholder="Write your message.." rows={4} />
                </div>

                {/* Arrival Time */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-2">
                    <h4 className="text-base font-semibold">Your arrival time</h4>
                    <p className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircleFilled className="text-green-500" />
                        Your room will be ready for check-in between 14:30 and 18:00
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

export default RoomBookingStepTwo;
