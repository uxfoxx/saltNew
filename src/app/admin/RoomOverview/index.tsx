import { Booking, OverviewData } from "../../../types";
import OverviewCard from "../../components/over-view/OverviewCard";


const sampleRoomBookings: Booking[] = [
    {
        id: '2',
        guestName: 'Sarah Johnson',
        startDate: new Date('2025-01-20'),
        endDate: new Date('2025-01-22'),
        status: 'checked-in',
        phone: '+1 (555) 987-6543',
        email: 'sarah.johnson@email.com'
    },
    {
        id: '4',
        guestName: 'Emily Davis',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-02-03'),
        status: 'confirmed',
        phone: '+1 (555) 321-0987',
        email: 'emily.davis@email.com'
    }
];

const RoomOverview: React.FC = () => {
    const roomData: OverviewData = {
        title: 'Room 101',
        subtitle: 'Deluxe • $200/night',
        status: 'occupied',
        statusOptions: ['occupied', 'available', 'maintenance'],
        totalBookings: 15,
        revenue: '$200',
        occupancyText: 'Room is currently unoccupied',
        appointmentText: 'No upcoming appointments',
        lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
        currentBookings: 15,
        label: 'room',
        bookings: sampleRoomBookings,
        pricePerNight: 200,
        type: 'room'
    };

    return <OverviewCard data={roomData} />;
};

export default RoomOverview;