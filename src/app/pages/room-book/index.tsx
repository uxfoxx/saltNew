import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Steps, Button } from 'antd';
import type { StepProps } from 'antd/es/steps';
import { FilterFieldConfig, FormDataProps } from '../../../types';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import ReservationCompletedModal from './widgets/ReservationCompletedModal';
import RoomBookingStepOne from './widgets/RoomBookingStepOne';
import RoomBookingStepTwo from './widgets/RoomBookingStepTwo';
import RoomBookingStepThree from './widgets/RoomBookingStepThree';

interface RoomBookType {
    bookingType: 'ROOM' | null;
}

const RoomBook: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingType: RoomBookType['bookingType'] = location.state?.bookingType || null;

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormDataProps>({
        checkInDate: new Date(),
        checkOutDate: new Date(),
        numberOfGuests: 4, // Default to 1 guest
        roomDetails: {
            roomId: 'af4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
            roomCount: 0,
        },
    });
    const [showModal, setShowModal] = useState(false);

    const fields: FilterFieldConfig<FormDataProps>[] = [
        {
            id: 'checkInDate',
            name: 'checkInDate',
            label: 'Check-in Date',
            type: 'date',
            required: true,
            minDate: new Date(),
        },
        {
            id: 'checkOutDate',
            name: 'checkOutDate',
            label: 'Check-out Date',
            type: 'date',
            required: true,
            minDate: dayjs(formData.checkInDate).add(1, 'day').toDate(),
        },
        {
            id: 'numberOfGuests',
            name: 'numberOfGuests',
            label: 'Number of Guests',
            placeholder: 'Enter number of guests',
            type: 'number',
            required: true,
            min: 1,
            max: 10,
        },
    ];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (!bookingType) {
            navigate('/');
        }
    }, [bookingType, navigate]);

    const steps: StepProps[] = [
        {
            title: 'Booking',
        },
        {
            title: 'Your Details',
        },
        {
            title: 'Payment',
        }
    ];

    const next = () => setCurrentStep(prev => prev + 1);
    const prev = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        next(); // Move to the next step after submission
    };

    const renderStepContent = () => {
        if (bookingType === 'ROOM') {
            if (currentStep === 0) return (
                <RoomBookingStepOne
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    fields={fields}
                />
            );
            if (currentStep === 1) return <RoomBookingStepTwo />;
            if (currentStep === 2) return <RoomBookingStepThree />

        }
        return <div>Coming soon</div>;
    };

    const handleCompleteBooking = () => {
        setShowModal(true);
    };

    return (
        <>
            <main className={`pt-[76px] px-4 w-full mx-auto ${(currentStep !== 1 && currentStep !== 2) ? 'max-w-4xl' : 'w-full'}`}>
                <div className='py-10 w-full'>
                    <div className='max-w-4xl mx-auto'>
                        <Steps size="small" current={currentStep} items={steps} className="mb-8" />
                    </div>

                    <div className="min-h-[400px]">{renderStepContent()}</div>

                    <div className="flex justify-between mt-8 gap-4">
                        {currentStep > 0 ? (
                            <Button onClick={prev} type="default" className='w-full'>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                        fill="currentColor" />
                                </svg>
                                Previous
                            </Button>
                        ) : (
                            <Button onClick={() => navigate(-1)} type="default" className='w-full bg-[#d7d7d7]'>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                        fill="currentColor" />
                                </svg>
                                Cancel
                            </Button>
                        )}
                        {currentStep < steps.length && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    if (currentStep === steps.length - 1) {
                                        handleCompleteBooking();
                                    } else {
                                        next();
                                    }
                                }}
                                className='w-full'
                            >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                        fill="currentColor" />
                                </svg>
                                {currentStep === steps.length - 1 ? 'Complete Booking' : 'Next'}
                            </Button>
                        )}
                    </div>
                </div>
            </main>
            <ReservationCompletedModal
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onDownload={() => {
                    const doc = new jsPDF();

                    doc.setFontSize(16);
                    doc.text('Reservation Receipt', 20, 20);

                    doc.setFontSize(12);
                    let y = 40;

                    // Room Details
                    doc.text(`Room Name: Deluxe Double Sharing Room`, 20, y); y += 10;
                    doc.text(`Check-in Date: Thu 1 May 2025`, 20, y); y += 10;
                    doc.text(`Check-out Date: Fri 2 May 2025`, 20, y); y += 10;
                    doc.text(`Time: 14:30 – 18:00`, 20, y); y += 10;
                    doc.text(`Total Number of Guests: ${formData.numberOfGuests}`, 20, y); y += 10;
                    doc.text(`Total Number of Rooms: ${formData.roomDetails?.roomCount || 0}`, 20, y); y += 15;

                    // Charges Section
                    doc.setFontSize(13);
                    doc.text('Charges:', 20, y); y += 10;
                    doc.setFontSize(12);
                    doc.text(`Room ................................................ LKR 31,989.06`, 20, y); y += 10;
                    doc.text(`Bead And Breakfast ............................. LKR 31,989.06`, 20, y); y += 15;

                    // Total
                    doc.setFontSize(13);
                    doc.text(`Total: LKR 31,989.06`, 20, y); y += 10;
                    doc.setFontSize(10);
                    doc.text(`(Includes taxes and charges)`, 20, y); y += 15;

                    // Notes
                    doc.setFontSize(11);
                    doc.setTextColor(90);
                    doc.text('Note:', 20, y); y += 7;
                    doc.text(`Reservations for 14 or more guests will require a set menu.`, 20, y); y += 7;
                    doc.text(`Ordering from the menu will not be available for large group bookings.`, 20, y); y += 10;

                    // Save PDF
                    doc.save('reservation-receipt.pdf');

                    setShowModal(false);
                    navigate('/'); // redirect to home page
                }}

                data={{
                    roomName: 'Deluxe Double Sharing Room',
                    checkInDate: 'Thu 1 May 2025',
                    time: '14:30 – 18:00',
                    guests: typeof formData.numberOfGuests === 'number' ? formData.numberOfGuests : 0,
                    rooms: formData.roomDetails?.roomCount || 2,
                }}
            />
        </>
    );
};

export default RoomBook;
