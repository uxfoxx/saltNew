import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Steps, Button } from 'antd';
import type { StepProps } from 'antd/es/steps';
import TableBookingStepOne from './widgets/TableBookingStepOne';
import { FilterFieldConfig, ReservationFormData } from '../../../types';
import dayjs from 'dayjs';
import TableBookingStepTwo from './widgets/TableBookingStepTwo';
import ReservationCompletedModal from './widgets/ReservationCompletedModal';
import jsPDF from 'jspdf';

interface TableBookType {
    bookingType: 'TABLE' | null;
}

const TableBook: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingType: TableBookType['bookingType'] = location.state?.bookingType || null;

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ReservationFormData>({
        reservationDate: new Date(),
        reservationTime: dayjs().format('HH:mm'), // Default to current time in HH:mm format
        numberOfGuests: 4, // Default to 1 guest
        tableDetails: {
            tableId: 'af4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
            tableCount: 0,
        },
    });
    const [showModal, setShowModal] = useState(false);

    const fields: FilterFieldConfig<ReservationFormData>[] = [
        {
            id: 'reservationDate',
            name: 'reservationDate',
            label: 'Reservation Date',
            type: 'date',
            required: true,
            minDate: new Date(),
        },
        {
            id: 'reservationTime',
            name: 'reservationTime',
            label: 'Reservation Time',
            type: 'time',
            required: true,
            use12Hours: true,
            format: 'HH:mm',
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
        if (bookingType === 'TABLE') {
            if (currentStep === 0) return (
                <TableBookingStepOne
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    fields={fields}
                />
            );
            if (currentStep === 1) return <TableBookingStepTwo />;
        }
        return <div>Coming soon</div>;
    };

    const handleCompleteBooking = () => {
        setShowModal(true);
    };

    return (
        <>
            <main className="pt-[76px] px-4 max-w-4xl w-full mx-auto">
                <div className='py-10 w-full'>
                    <Steps size="small" current={currentStep} items={steps} className="mb-8" />

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
                                {currentStep === steps.length - 1 ? 'Complete Table Reservation' : 'Next'}
                            </Button>
                        )}
                    </div>
                </div>
            </main>
            <ReservationCompletedModal
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onDownload={() => {
                    // generate PDF or download logic
                    const doc = new jsPDF();

                    doc.setFontSize(16);
                    doc.text('Reservation Receipt', 20, 20);

                    doc.setFontSize(12);
                    doc.text(`Room Name: Deluxe Double Sharing Room`, 20, 40);
                    doc.text(`Check-in Date: Thu 1 May 2025`, 20, 50);
                    doc.text(`Time: 14:30 – 18:00`, 20, 60);
                    doc.text(`Total Number of Guests: ${formData.numberOfGuests}`, 20, 70);
                    doc.text(`Total Number of Tables: ${formData.tableDetails?.tableCount || 0}`, 20, 80);

                    doc.text(`Note: Reservations for 14 or more guests will require a set menu.`, 20, 100);
                    doc.text(`Ordering from the menu will not be available for large group bookings.`, 20, 110);

                    doc.save('reservation-receipt.pdf');
                    setShowModal(false);
                    // After download, redirect to home page

                    navigate('/'); // Redirect after download
                }}
                data={{
                    roomName: 'Deluxe Double Sharing Room',
                    checkInDate: 'Thu 1 May 2025',
                    time: '14:30 – 18:00',
                    guests: typeof formData.numberOfGuests === 'number' ? formData.numberOfGuests : 0,
                    tables: formData.tableDetails?.tableCount || 2,
                }}
            />
        </>
    );
};

export default TableBook;
