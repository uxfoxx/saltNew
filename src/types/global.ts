export type userRoleType = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT' | 'GUEST';
export interface CustomError extends Error {
    response?: {
        status?: number;
        data?: {
            message?: string;
            error?: string;
        };
    };
}

export interface Room {
    id: string;
    number: string;
    name: string;
    type: string;
    capacity: number;
    pricePerNight: number;
    status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'ready';
    bannerImage: string;
    images: string[];
    roomOptions: string[];
    currentGuest?: string;
    nextAppointment?: Date;
    lastCleaned?: Date;
    bookings: Booking[];
}

export interface Table {
    id: string;
    number: string;
    seats: number;
    status: 'available' | 'occupied' | 'out-of-service' | 'needs-cleaning' | 'ready' | 'preparing';
    currentReservation?: string;
    nextReservation?: Date;
    lastCleaned?: Date;
    bookings: Booking[];
}

export interface Booking {
    id: string;
    guestName: string;
    startDate: Date;
    endDate: Date;
    status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
    notes?: string;
    phone?: string;
    email?: string;
    partySize?: number;
}
export interface OverviewData {
    title: string;
    subtitle: string;
    status: string;
    statusOptions: string[];
    totalBookings: number;
    revenue: string;
    occupancyText: string;
    appointmentText: string;
    lastCleaned?: string;
    currentBookings?: number;
    label?: string;
    bookings: Booking[];
    pricePerNight?: number;
    type: 'room' | 'table';
}