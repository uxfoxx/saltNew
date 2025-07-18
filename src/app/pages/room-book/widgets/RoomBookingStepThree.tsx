import React from 'react';
import { Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const RoomBookingStepThree: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 w-full">
            {/* Sidebar Summary */}
            <div className="space-y-4">
                {/* Date & Room Info */}
                <div className='border rounded-lg p-4 shadow-custom6 text-sm space-y-4'>
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-xs text-gray-500">Check-In</h4>
                            <p className="font-semibold">Thu 1 May 2025</p>
                            <p className="text-xs text-gray-500">14:30 – 18:00</p>
                        </div>
                        <div>
                            <h4 className="text-xs text-gray-500">Check-Out</h4>
                            <p className="font-semibold">Fri 2 May 2025</p>
                            <p className="text-xs text-gray-500">11:00 – 12:00</p>
                        </div>
                    </div>
                    <div className="text-xs">
                        <p className="mb-1 font-semibold">4 Total Guests</p>
                        <p className="font-semibold">2 Total Rooms</p>
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
                    <h4 className="font-semibold">Price information</h4>
                    <div className="flex items-start gap-2">
                        <span className="text-lg">💱</span>
                        <p className="text-xs">
                            This price is converted to show you the approximate cost in LKR.
                            You’ll pay in <strong>US$</strong> or <strong>LKR</strong>. The exchange rate may change<br />
                            before you pay.
                        </p>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-lg">💳</span>
                        <p className="text-xs">
                            Bear in mind that your card issuer may charge you a foreign transaction fee.
                        </p>
                    </div>
                    <div>
                        <p className="text-green-600 font-medium text-xs">Free cancellation before 30 Apr</p>
                        <div className="flex justify-between text-gray-600 text-xs">
                            <span>From 00:00 on 30 Apr</span>
                            <span>LKR 15,995</span>
                        </div>
                    </div>
                    <div className="bg-[#e9f2f2] px-4 py-3 rounded-md space-y-1">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-[#3b7576] text-lg font-bold">LKR 31,989.06</span>
                        </div>
                        <p className="text-xs text-gray-600 text-end">Includes taxes and charges</p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
                {/* Promo Code */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-2">
                    <h4 className="text-base font-semibold">Do you have a promo code?</h4>
                    <div className="flex gap-2">
                        <Input placeholder="#1234553" className="w-full" />
                        <Button type="default">Apply</Button>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="border rounded-lg p-4 shadow-custom6 space-y-2 min-h-[300px]">
                    <h4 className="text-base font-semibold">How would you like to pay?</h4>
                    {/* Add payment options here */}
                </div>

                {/* Email Consent */}
                <div className="text-xs space-y-3">
                    <Checkbox>
                        I consent to receiving marketing emails from Us, including promotions, personalised
                        recommendations, rewards, travel experiences and updates about Booking.com's products and services.
                    </Checkbox>
                    <Checkbox>
                        I consent to receiving marketing emails from Us, including promotions, personalised
                        recommendations, rewards, travel experiences and updates about Salt Transport Limited’s products and services.
                    </Checkbox>
                    <p>
                        By signing up, you let us tailor offers and consent to your interests by monitoring how you use Booking.com through
                        tracking technologies. Unsubscribe at any time. Read our <Link to="#" className="text-blue-600 underline">privacy policy</Link>.
                    </p>
                    <p className="text-gray-700">
                        Your booking is with Salt Mirissa directly and by completing this booking you agree to the <Link to="#" className="text-blue-600 underline">booking conditions</Link>,
                        <Link to="#" className="text-blue-600 underline mx-1">general terms</Link>,
                        <Link to="#" className="text-blue-600 underline">privacy policy</Link> and
                        <Link to="#" className="text-blue-600 underline ml-1">Wallet terms</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoomBookingStepThree;
